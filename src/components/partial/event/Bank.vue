<template>
  <div>
    <div class="text-center mx-2">{{ $vuetify.lang.t(`$vuetify.event.bank.description`) }}</div>
    <div class="d-flex justify-center ma-2">
      <currency name="gem_topaz" large></currency>
    </div>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-card class="ma-1" v-if="projectName !== null">
          <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.event.bank.project.name`) }}<v-icon class="mx-2">mdi-circle-small</v-icon>{{ $vuetify.lang.t(`$vuetify.event.bank.project.${projectName}`) }}</v-card-title>
          <v-card-text>
            <display-row v-for="(item, key) in projectDisplay" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
            <v-progress-linear class="rounded mt-2" height="20" color="amber" :value="projectPercent">{{ $formatNum(projectCurrent.spent) }} / {{ $formatNum(projectPrice) }}</v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-text-field :suffix="` / ${$formatNum(maxProjectPrice)}`" min="0" :max="maxProjectPrice" class="mr-2 mt-0 pt-0" type="number" v-model="fundAmount" hide-details></v-text-field>
            <v-btn color="primary" :disabled="fundAmount <= 0 || !hasAction" @click="projectFundCommit">{{ $vuetify.lang.t(`$vuetify.event.bank.project.fund`) }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="ma-1">
          <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.event.bank.investment.name`) }}</v-card-title>
          <v-card-text>{{ $vuetify.lang.t(`$vuetify.event.bank.investment.description`, $formatNum(investmentInterestLarge * 100), $formatNum(investmentSize), $formatNum(investmentInterestSmall * 100)) }}</v-card-text>
          <v-card-actions>
            <div v-if="investment > 0" class="d-flex w-100 justify-center align-center">
              <v-icon class="mr-1">mdi-finance</v-icon>
              <span>{{ $formatNum(investment) }}</span>
              <v-icon>mdi-chevron-right</v-icon>
              <span>{{ $formatNum(investmentNextProfit) }}</span>
            </div>
            <template v-else>
              <v-text-field :suffix="` / ${$formatNum(topaz)}`" min="0" :max="topaz" class="mt-0 pt-0" type="number" v-model="investAmount" hide-details></v-text-field>
              <div class="mx-8 d-flex align-center">
                <v-icon class="mr-1">mdi-finance</v-icon>
                <span v-if="investmentProfit > 0">+{{ $formatNum(investmentProfit) }}</span>
                <span v-else>-</span>
              </div>
              <v-btn color="primary" :disabled="investAmountFinal <= 0 || !hasAction" @click="investmentCommit">{{ $vuetify.lang.t(`$vuetify.event.bank.investment.invest`) }}</v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="ma-1">
          <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.event.bank.loan.name`) }}</v-card-title>
          <v-card-text>{{ $vuetify.lang.t(`$vuetify.event.bank.loan.description`, $formatNum(loanInterest * 100)) }}</v-card-text>
          <v-card-actions v-if="loan > 0">
            <v-text-field :suffix="` / ${$formatNum(maxLoanRepay)}`" min="0" :max="maxLoanRepay" class="mr-2 mt-0 pt-0" type="number" v-model="loanRepayAmount" hide-details></v-text-field>
            <v-btn color="primary" :disabled="loanRepayAmount <= 0" @click="loanRepayCommit">{{ $vuetify.lang.t(`$vuetify.event.bank.loan.repay`) }}</v-btn>
          </v-card-actions>
          <v-card-actions>
            <div v-if="loan >= loanSize" class="d-flex w-100 justify-center align-center">
              <v-icon class="mr-1">mdi-receipt</v-icon>
              <span>{{ $formatNum(loan) }}</span>
            </div>
            <template v-else>
              <v-text-field :suffix="` / ${$formatNum(maxLoanSize)}`" min="0" :max="maxLoanSize" class="mt-0 pt-0" type="number" v-model="loanBorrowAmount" hide-details></v-text-field>
              <div class="mx-8 d-flex align-center">
                <v-icon class="mr-1">mdi-receipt</v-icon>
                <span>{{ $formatNum(loan) }}</span>
                <template v-if="newLoanAmount > loan">
                  <v-icon>mdi-chevron-right</v-icon>
                  <span>{{ $formatNum(newLoanAmount) }}</span>
                </template>
              </div>
              <v-btn color="primary" :disabled="loanBorrowAmountFinal <= 0 || !hasAction" @click="loanBorrowCommit">{{ $vuetify.lang.t(`$vuetify.event.bank.loan.borrow`) }}</v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { BANK_INVESTMENT_INTEREST_LARGE, BANK_INVESTMENT_INTEREST_SMALL, BANK_LOAN_INTEREST } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, Currency },
  data: () => ({
    fundAmount: 0,
    investAmount: 0,
    loanRepayAmount: 0,
    loanBorrowAmount: 0
  }),
  computed: {
    ...mapState({
      projectName: state => state.event.bank_project_current,
      investment: state => state.event.bank_investment,
      loan: state => state.event.bank_loan,
      hasAction: state => state.event.bank_action
    }),
    projectCurrent() {
      return this.$store.state.event.bank_project[this.projectName];
    },
    projectPrice() {
      return this.projectCurrent.price(this.projectCurrent.level);
    },
    maxProjectPrice() {
      return Math.min(this.topaz, this.projectPrice - this.projectCurrent.spent);
    },
    projectPercent() {
      return 100 * this.projectCurrent.spent / this.projectPrice;
    },
    projectDisplay() {
      return this.projectCurrent.effect.map(elem => {
        const lvl = this.projectCurrent.level;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: elem.value(lvl + 1)
        };
      });
    },
    topaz() {
      return this.$store.getters['currency/value']('gem_topaz');
    },
    investmentInterestLarge() {
      return BANK_INVESTMENT_INTEREST_LARGE;
    },
    investmentInterestSmall() {
      return BANK_INVESTMENT_INTEREST_SMALL;
    },
    investmentSize() {
      return this.$store.getters['mult/get']('bankInvestmentSize');
    },
    loanInterest() {
      return BANK_LOAN_INTEREST;
    },
    loanSize() {
      return this.$store.getters['mult/get']('bankLoanSize');
    },
    maxLoanSize() {
      return Math.max(0, Math.min(this.loanSize - this.loan, this.$store.state.currency.gem_topaz.cap - this.$store.state.currency.gem_topaz.value));
    },
    maxLoanRepay() {
      return Math.min(this.loan, this.topaz);
    },
    investAmountFinal() {
      if (isNaN(this.investAmount)) {
        return 0;
      }
      return Math.min(this.topaz, Math.max(0, this.investAmount));
    },
    loanBorrowAmountFinal() {
      if (isNaN(this.loanBorrowAmount)) {
        return 0;
      }
      return Math.min(this.maxLoanSize, Math.max(0, this.loanBorrowAmount));
    },
    investmentProfit() {
      let interest = Math.min(this.investAmountFinal, this.investmentSize) * this.investmentInterestLarge;
      if (this.investAmountFinal > this.investmentSize) {
        interest += (this.investAmountFinal - this.investmentSize) * this.investmentInterestSmall;
      }
      return Math.floor(interest);
    },
    investmentNextProfit() {
      let interest = Math.min(this.investment, this.investmentSize) * this.investmentInterestLarge;
      if (this.investment > this.investmentSize) {
        interest += (this.investment - this.investmentSize) * this.investmentInterestSmall;
      }
      return Math.floor(this.investment + interest);
    },
    newLoanAmount() {
      return this.loan + Math.ceil(this.loanBorrowAmountFinal * (this.loanInterest + 1));
    }
  },
  methods: {
    projectFundCommit() {
      this.$store.dispatch('event/bankProjectFund', isNaN(this.fundAmount) ? 0 : Math.min(this.maxProjectPrice, Math.max(0, this.fundAmount)));
    },
    investmentCommit() {
      this.$store.dispatch('event/bankInvest', this.investAmountFinal);
    },
    loanRepayCommit() {
      this.$store.dispatch('event/bankLoanRepay', isNaN(this.loanRepayAmount) ? 0 : Math.min(this.topaz, Math.max(0, this.loanRepayAmount)));
    },
    loanBorrowCommit() {
      this.$store.dispatch('event/bankLoanBorrow', this.loanBorrowAmountFinal);
    }
  }
}
</script>
