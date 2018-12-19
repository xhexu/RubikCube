angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.backgroundColorByHexString("#91BAFC");
        StatusBar.show();
        // StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

    //统一指定 tab 的样式
    $ionicConfigProvider.platform.android.tabs.position("bottom");
    $ionicConfigProvider.platform.android.tabs.style("standard");
    $ionicConfigProvider.platform.android.navBar.alignTitle("center");

    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");

    $ionicConfigProvider.templates.maxPrefetch(10);

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
      .state('tab.init', {
        url: '/init',
        abstract: true,
        templateUrl: 'views/launch.html'
      })
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'views/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'views/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        },
        cache: false
      })
      .state('tab.chat-detail', {
        url: '/chats-detail',
        params: {
          data: null
        },
        views: {
          'tab-chats': {
            templateUrl: 'views/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'views/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/tab/dash');
  });

// angular.element(document).ready(function(){
//   console.log(11111111111111111111111111);
// })
angular.module('starter.controllers', [])
    .controller('DashCtrl', function($scope) {

        var demand_id = "";
        var taskFlag = "";
        var flagQuery = "0";
        var taskID = "0";
        var vm = {};
        var showNo = "";
        var uploadParams = {};

        vm = new Vue({
            el: '#app',
            data: {
                businessData: {
                    userId: "11517",
                    userName: "12323",
                    bgtYear: "",
                    deptCode: "",
                    deptName: "",
                    fundDeptCode: "",
                    yearDate: "",
                    rowData: {},
                    approveData: {},
                    taskFlags: '',
                    flagQueryData: '',
                    attachArray: {}
                },
                dataLoaded: false,
                windowShow: false,
                ifShow: true,
                ifChecked: false,
                isSubmitShow: true,
                isApproveShow: true,
                isBackshow: true,
                isResetShow: true,
                isPrintshow: true,
                isSubmitDisabled: false,
                isApproveDisabled: false,
                isBackDisabled: false,
                isResetDisabled: false,
                isPrintDisabled: false
            },
            methods: {
                submitPaymentAppr: function() {
                    var me = this;
                    me.$refs['formRef'].getElement("BUDGET_MEDICAL_PAYMENT_APPROVAL").validate(function(valid) {
                        if (!valid) {

                        } else {
                            var insideForm = me.$refs['formRef'].getData("budgetMedicalPaymentApproval");
                            if (insideForm.AVAILABLE_MONEY < 0) {

                            }
                            insideForm.BILL_TYPE = '15';
                            insideForm.PAY_ID = demand_id;
                            insideForm.SHOW_NO = showNo;
                            insideForm.INITIATOR_ID = vm.businessData.userId;
                            insideForm.FUND_DEPT_CODE = vm.businessData.fundDeptCode;
                            insideForm.formData = JSON.stringify(insideForm);
                        }
                    });
                },
                approveOrBack: function(checkType) {
                    var me = this;
                    var insideForm = me.$refs['formRef'].getData("budgetMedicalPaymentApproval");
                    insideForm.BILL_TYPE = '15';
                    insideForm.FUND_DEPT_CODE = vm.businessData.fundDeptCode;
                    insideForm.PAY_ID = demand_id;
                    insideForm.taskFlag = taskFlag;
                    insideForm.checkType = checkType;
                    insideForm.formData = JSON.stringify(insideForm);
                },
                reset: function() {
                    parent.$('#outWin').window('close');
                    parent.$('#taskWin').window('close');
                },
                initPaymentTaskInfo: function(demand_ids, taskFlagData, flagQuerys) {
                    taskFlag = taskFlagData;
                    demand_id = demand_ids;
                    flagQuery = flagQuerys;
                    vm.businessData.taskFlags = taskFlagData;
                    vm.businessData.flagQueryData = flagQuerys;
                    initApproveRecord();
                    doQueryAttachInfo();
                    doQueryPaymentTaskInfo();
                    isButtonEditable();
                }
            },
            mounted: function() {}
        });

        //查询数据
        function doQueryPaymentTaskInfo() {
            var obj = { "demand_id": demand_id };
            vm.dataLoaded = false;
        }

        //获取审批意见
        function initApproveRecord() {
            var obj = { "demand_id": demand_id };
        }

        //设置按钮状态
        function isButtonEditable() {
            if (flagQuery == "0") { //查看环节
                vm.isSubmitDisabled = true;
                vm.isApproveDisabled = true;
                vm.isBackDisabled = true;
                vm.isResetDisabled = true;
                vm.isPrintDisabled = false;
            } else {
                if (taskFlag == "BUD_PAYMENT_APPLY") {
                    vm.isSubmitShow = true;
                    vm.isApproveShow = false;
                    vm.isBackshow = false;
                    vm.isResetShow = true;
                    vm.isPrintshow = false;
                } else {
                    vm.isSubmitShow = false;
                    vm.isApproveShow = true;
                    vm.isBackshow = true;
                    vm.isResetShow = false;
                    vm.isPrintshow = true;
                }
            }
        }
        var fileFunc = {
            attachProps: function(code, label) {
                var filelist = {
                    ':file-list': code,
                    'auto-upload': false,
                    'limit': 10,
                    'label': label,
                    'multiple': true,
                    'action': '',
                    'before-upload': function(file) {},
                    'on-preview': function(file) {
                        if (file.status == 'finished') {}
                    },
                    'on-remove': function(file, fileList) {
                        if (file.status == 'finished') {}
                    },
                    'on-error': function(err, file, fileList) {
                        this.$message({
                            message: '上传失败',
                            type: 'error'
                        });
                    }

                }
                return filelist;
            }
        };
        //获取附件信息
        function doQueryAttachInfo() {
            var array = [];
            var fileList = [];
            var obj = {
                'businessId': demand_id,
                'subSystemCode': 'BUD',
                'businessType': 'MEDICAL_PAYMENT'
            };


            for (var i = 0; i < array.length; i++) {
                fileList.push({
                    'attachId': array[i].ATTACH_ID,
                    'bussinessId': array[i].BUSSINESS_ID,
                    'attachConfigId': array[i].ATTACH_CONFIG_ID,
                    'name': array[i].ATTACH_NAME,
                    'status': 'finished'
                });
            }
            vm.businessData.attachArray = fileList;
        }

    })
    .controller('ChatDetailCtrl', function($scope) {


    })
    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
    .controller('ChatsCtrl', function($scope, $state) {

    })
var jsInterface = {
	/**
	 * 数据同步完成
	 * @param data
	 */
	onSyncDone: function(data) {
		angular.element(document.body).injector().get('IM_EVENT').onSyncDone(data);
	},

	receiveMessage: function(data) {
		angular.element(document.body).injector().get('IMMessageService').receiveMessage(data);
	},
	/**
	 * 接收会话列表
	 * @param session
	 */
	receiveSession: function(data) {
		angular.element(document.body).injector().get('IMSessionService').receiveSessionObserver(data);
	}
}
var BUDGET_MEDICAL_PAYMENT_APPROVAL = {
    data: {
        budgetMedicalPaymentApproval: {
            ATTACHMENT: []
        },
        userId: '',
        userName: '',
        bgtYear: '',
        deptCode: '',
        deptName: '',
        fundDeptCode: '',
        budgetSubjectConfig: {},
        budgetDeptInfoConfig: {},
        yearDate: {},
        rowInfo: {},
        approveInfo: {},
        formEditable: false,
        isDeptEditable: true,
        isFuncEditable: true,
        isFinanceEditable: true,
        isChiecEditable: true,
        isDeanEditable: true,
        isMedicalEditable: true,
        isHoldingEditable: true,
        isFinanExeEditable: true,
        taskFlagInfo: '',
        flagQueryInfo: '',
        balanceMoney: '',
        //    	budgetId : '',
        //    	paymentMoney : '',
        attachInfo: {},
        action: 'MedicalPaymentApprovalHandler.jspx?moduleNo=' + "" + '&op=',
        comboGridActionUrl: hostName + "/Comm/ComboGridHandler.jspx?op="
    },
    //    ready: function () {
    //    },
    mounted: function(done) {
        var me = this;
        if (this.businessData) {
            me.userId = me.businessData.userId;
            me.userName = me.businessData.userName;
            me.bgtYear = me.businessData.bgtYear;
            me.deptCode = me.businessData.deptCode;
            me.deptName = me.businessData.deptName;
            me.fundDeptCode = me.businessData.fundDeptCode;
            me.rowInfo = me.businessData.rowData;
            me.approveInfo = me.businessData.approveData;
            me.taskFlagInfo = me.businessData.taskFlags;
            me.flagQueryInfo = me.businessData.flagQueryData;
            me.yearDate = me.businessData.yearDate;
            me.attachInfo = me.businessData.attachArray;
            //        	me.budgetId = me.businessData.rowData.BUDGET_ID;
            //        	me.paymentMoney = me.businessData.rowData.PAYMENT_MONEY;
        }
        me.initDeptInfo();
        me.initPaymentInfo(me.rowInfo);
        me.initPaymentApprInfo(me.approveInfo);
        me.initAttachInfo(me.attachInfo);
        me.getBudgetSubject(me.deptCode);
        me.budgetMedicalPaymentApproval.INITIATOR = me.userName;
        me.budgetMedicalPaymentApproval.FUND_DEPT_CODE = me.deptName;
        //        me.budgetMedicalPaymentApproval.FINANCE_YEAR = me.bgtYear;
        if (me.taskFlagInfo == "BUD_PAYMENT_APPLY" || me.taskFlagInfo) {
            this.formEditable = false;
        } else {
            this.formEditable = true;
        }
        me.balanceMoney = me.rowInfo.BALANCE_MONEY;
        //根据审批环节设置审批意见是否禁用
        if (me.taskFlagInfo == "BUD_PAYMENT_FINAL" && !me.flagQueryInfo == "0") {
            this.isDeptEditable = false;
            me.budgetMedicalPaymentApproval.DEPT_PRINCIPAL = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_D1" && !me.flagQueryInfo == "0") {
            this.isFuncEditable = false;
            me.budgetMedicalPaymentApproval.FUNC_DEPT = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_D2" && !me.flagQueryInfo == "0") {
            this.isFinanceEditable = false;
            me.budgetMedicalPaymentApproval.FINANCE_CHECK = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_D3" && !me.flagQueryInfo == "0") {
            this.isChiecEditable = false;
            me.budgetMedicalPaymentApproval.CHIEC_FINAL = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_D4" && !me.flagQueryInfo == "0") {
            this.isDeanEditable = false;
            me.budgetMedicalPaymentApproval.DEAN = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_D5" && !me.flagQueryInfo == "0") {
            this.isMedicalEditable = false;
            me.budgetMedicalPaymentApproval.MEDICAL_GROUP = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_D6" && !me.flagQueryInfo == "0") {
            this.isHoldingEditable = false;
            me.budgetMedicalPaymentApproval.HOLDING_GROUP = "";
        } else if (me.taskFlagInfo == "BUD_PAYMENT_FINAL_END" && !me.flagQueryInfo == "0") {
            this.isFinanExeEditable = false;
            me.budgetMedicalPaymentApproval.FINANCE_EXE = "";
        }
        done();
    },
    element: function() {
        return [{
            type: 'form',
            code: 'BUDGET_MEDICAL_PAYMENT_APPROVAL',
            props: {
                $model: 'budgetMedicalPaymentApproval'
            },
            children: [{
                'code': 'CPMS_NO',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CPMS_NO',
                    'label': '合同编号',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'placeholder': '',
                    'neccesary': false,
                    'validate': [{ max: 30, message: "长度在30个字符以内!" }]
                },
                'type': 'input'
            }, {
                'code': 'CPMS_AMOUNT',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CPMS_AMOUNT',
                    'label': '合同金额<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'placeholder': '请输入',
                    'neccesary': true,
                    'prepend': '¥:',
                    'min': 1,
                    'max': 9,
                    'validate': [{ "required": true, "message": "合同金额不能为空,请输入！" }]
                },
                'type': 'number'
            }, {
                'code': 'CPMS_NAME',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CPMS_NAME',
                    'label': '合同名称',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': true,
                    'text': 'aaa',
                    'validate': [{ "required": true, "message": "合同名称不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                'type': 'input'
            }, {
                'code': 'FINANCE_YEAR',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.FINANCE_YEAR',
                    'label': '预算年度',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'neccesary': true,
                    'config': {
                        'data': this.businessData.yearDate,
                        'valueField': 'id',
                        'textField': 'text'
                    },
                    'validate': [{ "required": true, "message": "预算年度不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                on: {
                    change: 'getDeptInfo'
                },
                'type': 'combobox'
            }, {
                'code': 'DEPT_CODE',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.DEPT_CODE',
                    'label': '预算部门',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'neccesary': true,
                    '$config': 'budgetDeptInfoConfig',
                    'validate': [{ "required": true, "message": "预算部门不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                on: {
                    change: 'getBudgetSubject'
                },
                'type': 'combogrid'
            }, {
                'code': 'BUDGET_ID',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.BUDGET_ID',
                    'label': '预算科目',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': true,
                    '$config': 'budgetSubjectConfig',
                    'validate': [{ "required": true, "message": "预算科目不能为空,请输入！" }]
                },
                on: {
                    change: 'getBudgetMoneyInfo'
                },
                'type': 'combogrid'
            }, {
                'code': 'TOTAL_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.TOTAL_MONEY',
                    'label': '预算总额<span style="display: block;color: #999;">(单位：元)</span>',
                    'disabled': true,
                    'span': 12,
                    'placeholder': '',
                    'neccesary': true,
                    'prepend': '¥:',
                    'min': 1,
                    'max': 9,
                    'validate': [{ "required": true, "message": "合同金额不能为空,请输入！" }]
                },
                'type': 'number'
            }, {
                'code': 'AVAILABLE_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.AVAILABLE_MONEY',
                    'label': '可用额度<span style="display: block;color: #999;">(单位：元)</span>',
                    'disabled': true,
                    'span': 12,
                    'placeholder': '',
                    'neccesary': true,
                    'prepend': '¥:',
                    'min': 1,
                    'max': 9,
                    'validate': [{ "required": true, "message": "合同金额不能为空,请输入！" }]
                },
                'type': 'number'
            }, {
                'code': 'CONSTRACT_DATE',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CONSTRACT_DATE',
                    'label': '签约时间',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "签约时间不能为空,请选择！" }]
                },
                'type': 'date'
            }, {
                'code': 'BILL_LEVEL',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.BILL_LEVEL',
                    'label': '重要等级',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'neccesary': true,
                    'config': {
                        '$disabled': 'formEditable',
                        'valueField': 'id',
                        'textField': 'text',
                        'data': [{
                            'id': '1',
                            'text': '重要'
                        }, {
                            'id': '0',
                            'text': '一般'
                        }]
                    },
                    'validate': [{ "required": true, "message": "重要等级不能为空,请选择！" }]
                },
                'type': 'combobox'
            }, {
                'code': 'FUND_DEPT_CODE',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.FUND_DEPT_CODE',
                    'label': '发起部门',
                    'disabled': true,
                    'span': 12,
                    'neccesary': true,
                    '$config': 'budgetDeptInfoConfig',
                    'validate': [{ "required": true, "message": "发起部门不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                'type': 'combogrid'
            }, {
                'code': 'INITIATOR',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.INITIATOR',
                    'label': '发起人',
                    'disabled': true,
                    'span': 12,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "发起人不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                'type': 'input'
            }, {
                'code': 'CPMS_PARTY_A',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CPMS_PARTY_A',
                    'label': '甲方',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "甲方不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                'type': 'input'
            }, {
                'code': 'CPMS_PARTY_B',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CPMS_PARTY_B',
                    'label': '乙方',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "乙方不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }]
                },
                'type': 'input'
            }, {
                type: 'sub-group',
                code: ' AMOUNT_INFO_GROUP',
                props: {
                    label: '金额信息'
                },
                children: this._createAmountInfo()
            }, {
                type: 'sub-group',
                code: 'AUDIT_INFO_GROUP',
                props: {
                    label: '审核信息'
                },
                children: this._createAuditInfo()
            }]
        }]
    },

    methods: {
        _createAmountInfo: function() {
            var me = this;
            var amountInfo = [{
                'code': 'PAYABLE_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.PAYABLE_MONEY',
                    'label': '累计应付金额<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '请输入',
                    'neccesary': true,
                    'prepend': '¥:',
                    'validate': [{ "required": true, "message": "累计应付金额不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }, {
                'code': 'PAID_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.PAID_MONEY',
                    'label': '累计已付金额<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '请输入',
                    'neccesary': true,
                    'prepend': '¥:',
                    'validate': [{ "required": true, "message": "累计已付金额不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }, {
                'code': 'CUMULATIVE_INVOICE',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CUMULATIVE_INVOICE',
                    'label': '累计开具发票<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '请输入',
                    'neccesary': true,
                    'prepend': '¥:',
                    'validate': [{ "required": true, "message": "累计开具发票不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }, {
                'code': 'CUMULATIVE_RECEIPT',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CUMULATIVE_RECEIPT',
                    'label': '累计开具收据<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': false,
                    'placeholder': '',
                    'prepend': '¥:',
                    //			      'validate': [{"message": "累计开具收据不能为空,请输入！"}],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }, {
                'code': 'PLAN_PAYMENT_DATE',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.PLAN_PAYMENT_DATE',
                    'label': '计划付款日期',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    'validate': [{ "message": "计划付款日期不能为空,请选择！" }],
                    'labelWidth': '110px'
                },
                'type': 'date'
            }, {
                'code': 'PAYMENT_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.PAYMENT_MONEY',
                    'label': '本次付款金额<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '请输入',
                    'neccesary': true,
                    'prepend': '¥:',
                    'validate': [{ "required": true, "message": "本次付款金额不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                on: {
                    change: 'changeAvaliableMoney'
                },
                'type': 'number'
            }, {
                'code': 'MEMO',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.MEMO',
                    'label': '付款说明',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "付款说明不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'SUPPLIER_INFO_ID',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.SUPPLIER_INFO_ID',
                    'label': '收款单位',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': true,
                    //			      'config' :  {
                    //			    	  'height': '300',
                    //	   		    	  'idField' : 'SUPPLIER_INFO_ID',
                    //	   	              'textField' : 'SUPPLIER',
                    //	   	              'remoteSort' : true,
                    //	   	              'url' : this.comboGridActionUrl + 'CommComboGridCols',
                    //	   	              'params' : {
                    //	   	            	   'table' : " (SELECT S.SUPPLIER_INFO_ID, S.SUPPLIER, S.BANK, S.BANKNO\n" +
                    //	   	            				 "  FROM ACCT_SUPPLIER_INFO S)",
                    //	   						'id' : 'SUPPLIER_INFO_ID',
                    //	   	                    'text' : 'SUPPLIER'
                    //	   	               },
                    //	   	               'columns': [{
                    //	   	                    'prop': 'SUPPLIER_INFO_ID',
                    //	   	                    'hidden' : true
                    //	   	                }, {
                    //	   	                    'prop': 'SUPPLIER',
                    //	   	                    'label' : '供应商名称'
                    //	   	                }, {
                    //	   	                	'prop' : 'BANK',
                    //	   	                	'label' : '开户银行'
                    //	   	                }, {
                    //	   	                	'prop' : 'BANKNO',
                    //	   	                	'label' : '开户账号'
                    //	   	                }]
                    //			      },
                    'validate': [{ "required": true, "message": "收款单位不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                'type': 'input'
                    //			    'on' : {
                    //			    	change: 'onPayEeChange'
                    //			    }
            }, {
                'code': 'BANK_ACCOUNT',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.BANK_ACCOUNT',
                    'label': '开户银行',
                    '$disabled': 'formEditable',
                    //			      'placeholder' : '',
                    'span': 24,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "开户银行不能为空！" }, { max: 30, message: "长度在30个字符以内!" }],
                    'labelWidth': '110px'
                },
                'type': 'input'
            }, {
                'code': 'COLLECTION_ACCOUNT',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.COLLECTION_ACCOUNT',
                    'label': '收款账号',
                    '$disabled': 'formEditable',
                    'placeholder': '请输入',
                    'span': 24,
                    'neccesary': true,
                    'validate': [{ "required": true, "message": "收款账号不能为空！" }, { max: 30, message: "长度在30个字符以内!" }],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }, {
                'code': 'PAY_WAY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.PAY_WAY',
                    'label': '支付方式',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    'validate': [{ "message": "支付方式不能为空,请输入！" }, { max: 30, message: "长度在30个字符以内!" }],
                    'labelWidth': '110px'
                },
                'type': 'input'
            }, {
                'code': 'CONTACT',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CONTACT',
                    'label': '联系人',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'placeholder': '',
                    'neccesary': false,
                    'validate': [{ max: 30, message: "长度在30个字符以内!" }],
                    'labelWidth': '110px'
                },
                'type': 'input'
            }, {
                'code': 'CONTACT_TEL',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CONTACT_TEL',
                    'label': '联系电话',
                    '$disabled': 'formEditable',
                    'span': 12,
                    'placeholder': '',
                    'neccesary': false,
                    'validate': [{ max: 30, message: "长度在30个字符以内!" }],
                    'labelWidth': '110px'
                },
                'type': 'input'
            }, {
                'code': 'ATTACHMENT',
                'type': 'upload',
                'props': fileFunc.attachProps('budgetMedicalPaymentApproval.ATTACHMENT', '附件')
            }, {
                'code': 'INVOICE_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.INVOICE_MONEY',
                    'label': '本次开具发票<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'placeholder': '请输入',
                    'neccesary': true,
                    'prepend': '¥:',
                    'validate': [{ "required": true, "message": "本次开具发票不能为空,请输入！" }],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }, {
                'code': 'RECEIPT_MONEY',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.RECEIPT_MONEY',
                    'label': '本次开具收据<span style="display: block;color: #999;">(单位：元)</span>',
                    '$disabled': 'formEditable',
                    'span': 24,
                    'neccesary': false,
                    'placeholder': '',
                    'prepend': '¥:',
                    //				      'validate': [{"message": "本次开具收据不能为空,请输入！"}],
                    'labelWidth': '110px'
                },
                'type': 'number'
            }];
            return amountInfo;
        },
        _createAuditInfo: function() {
            var me = this;
            var auditInfo = [{
                'code': 'DEPT_PRINCIPAL',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.DEPT_PRINCIPAL',
                    'label': '科室负责人',
                    '$disabled': 'isDeptEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'FUNC_DEPT',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.FUNC_DEPT',
                    'label': '职能部门',
                    '$disabled': 'isFuncEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'FINANCE_CHECK',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.FINANCE_CHECK',
                    'label': '财务部审核',
                    '$disabled': 'isFinanceEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'CHIEC_FINAL',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.CHIEC_FINAL',
                    'label': '主管院领导',
                    '$disabled': 'isChiecEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'DEAN',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.DEAN',
                    'label': '院长',
                    '$disabled': 'isDeanEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'MEDICAL_GROUP',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.MEDICAL_GROUP',
                    'label': '医疗集团董事长<span style="display: block;color: #999;">(金额50万以上)</span>',
                    '$disabled': 'isMedicalEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'HOLDING_GROUP',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.HOLDING_GROUP',
                    'label': '控股集团董事长<span style="display: block;color: #999;">(金额50万以上)</span>',
                    '$disabled': 'isHoldingEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }, {
                'code': 'FINANCE_EXE',
                'props': {
                    '$model': 'budgetMedicalPaymentApproval.FINANCE_EXE',
                    'label': '财务部执行、归档',
                    '$disabled': 'isFinanExeEditable',
                    'autosize': true,
                    'span': 24,
                    'placeholder': '',
                    'neccesary': false,
                    //				      'validate': [{max: 50, message: "长度在50个字符以内!"}],
                    'labelWidth': '110px'
                },
                'type': 'textarea'
            }];
            return auditInfo;
        },
        getBudgetSubject: function(newVal, oldVal, row) {
            var me = this;
            me.deptCode = newVal;
            var object = {
                'height': '300',
                'idField': 'BUDGET_ID',
                'textField': 'SUBJ_NAME',
                'remoteSort': true,
                'url': this.comboGridActionUrl + 'CommComboGridCols',
                'params': {
                    'table': "(SELECT B.BUDGET_ID,\n" +
                        "       B.SUBJ_NAME,\n" +
                        "       (CASE\n" +
                        "         WHEN BFP.FUND_PROJECT_TYPE = '4' THEN\n" +
                        "          BFP.PROJECT_NO\n" +
                        "         WHEN BFP.FUND_PROJECT_TYPE = '3' THEN\n" +
                        "          BRP.RESPROJECT_NO\n" +
                        "         ELSE\n" +
                        "          NULL\n" +
                        "       END) AS SCT_CODE,\n" +
                        "       S.PAYOUT_BUD,\n" +
                        "       P.PAYIN_SPEND,\n" +
                        "       (NVL(S.PAYOUT_BUD, 0) - NVL(P.PAYIN_SPEND, 0)) AS BALANCE\n" +
                        "  FROM BUD_BGTMASTER M, BUD_BUDGETDEPT B\n" +
                        "  LEFT JOIN BUD_BUDGET_ITEM_LIBRARY LBY\n" +
                        "    ON B.SUBJ_DETAIL_ID = LBY.ITEM_ID\n" +
                        "  LEFT JOIN BUD_ITEM_LIBRARY BIY\n" +
                        "    ON B.SUBJ_DETAIL_ID = BIY.ITEM_ID\n" +
                        "  LEFT JOIN BUD_FUND_PROJECT BFP\n" +
                        "    ON B.FUND_PROJECT_ID = BFP.FUND_PROJECT_ID\n" +
                        "  LEFT JOIN BUD_RSP_RESEARCH_PROJECT_INFO BRP\n" +
                        "    ON B.FUND_PROJECT_ID = BRP.FUND_PROJECT_ID\n" +
                        "  LEFT JOIN BUD_BUDGET_SUMMARY S\n" +
                        "    ON B.BUDGET_ID = S.BUDGET_ID\n" +
                        "   AND S.MONEY_SOURCE = '0'\n" +
                        "  LEFT JOIN V_BUD_SPEND P\n" +
                        "    ON B.BUDGET_ID = P.BUDGET_ID\n" +
                        " WHERE B.MASTER_ID = M.MASTER_ID\n" +
                        "   AND M.BGT_YEAR = '" + this.bgtYear + "'" +
                        "   AND M.BGT_TYPE != '13'\n" +
                        "   AND B.IS_CHILD = '1'\n" +
                        "   AND (B.ACTUAL_BUDGET_STATUS IS NULL OR\n" +
                        "       (B.ACTUAL_BUDGET_STATUS IS NOT NULL AND B.ACTUAL_BUDGET_STATUS != 1))\n" +
                        "   AND (LBY.ITEM_METHOD = 0 OR BIY.ITEM_METHOD = 0 OR\n" +
                        "       (LBY.ITEM_METHOD IS NULL AND BIY.ITEM_METHOD IS NULL))\n" +
                        "   AND M.DEPT_CODE = '" + this.deptCode + "'" +
                        "   AND (BFP.FUND_PROJECT_ID IS NULL OR\n" +
                        "       (BFP.FUND_PROJECT_ID IS NOT NULL AND\n" +
                        "       ((BFP.FUND_PROJECT_TYPE = '3' AND EXISTS\n" +
                        "        (SELECT 1\n" +
                        "              FROM BUD_RSP_SPEND_POWER A\n" +
                        "             WHERE B.BUDGET_ID = A.BUDGET_ID\n" +
                        "               AND A.USER_ID = '" + this.userId + "'" + ")) OR BFP.FUND_PROJECT_TYPE = '4')))\n" +
                        " ORDER BY B.ITEM_CODE_LIBRARY, B.BUD_ITEM_CODE ASC)",
                    'id': 'BUDGET_ID',
                    'text': 'SUBJ_NAME'
                },
                'columns': [{
                    'prop': 'BUDGET_ID',
                    'hidden': true
                }, {
                    'prop': 'SUBJ_NAME',
                    'label': '科目名称'
                }, {
                    'prop': 'PAYOUT_BUD',
                    'label': '预算',
                    'formatter': function(row, column, cellValue, index) {
                        if (!cellValue) {
                            return Number(cellValue).toFixed(2);
                        } else {
                            return "";
                        }
                    }
                }, {
                    'prop': 'PAYIN_SPEND',
                    'label': '开支',
                    'formatter': function(row, column, cellValue, index) {
                        if (!cellValue) {
                            //   	         					if (this.budgetId == row.BUDGET_ID) {
                            //	         						cellValue = cellValue + this.paymentMoney;
                            //	         					}
                            return Number(cellValue).toFixed(2);
                        } else {
                            return "";
                        }
                    }
                }, {
                    'prop': 'BALANCE',
                    'label': '可用额度',
                    'formatter': function(row, column, cellValue, index) {
                        if (!cellValue) {
                            //	   	         				if (this.budgetId == row.BUDGET_ID) {
                            //	         						cellValue = cellValue - this.paymentMoney;
                            //	         					}
                            return formatMoneyType(Number(cellValue).toFixed(2));
                        } else {
                            return "";
                        }
                    }
                }]
            };
            this.budgetSubjectConfig = object;
        },
        onPayEeChange: function(newVal, oldVal, row) {
            var me = this;
            me.budgetMedicalPaymentApproval.BANK_ACCOUNT = row.BANK;
            me.budgetMedicalPaymentApproval.COLLECTION_ACCOUNT = row.BANKNO;
        },
        getBudgetMoneyInfo: function(newVal, oldVal, row) {
            var me = this;
            me.budgetMedicalPaymentApproval.TOTAL_MONEY = row.PAYOUT_BUD.toFixed(2);
            me.budgetMedicalPaymentApproval.AVAILABLE_MONEY = row.BALANCE.toFixed(2);
            me.balanceMoney = row.BALANCE;
        },
        initPaymentInfo: function(rowData) {
            var me = this;
            me.budgetMedicalPaymentApproval.CPMS_NO = rowData.CPMS_NO;
            me.budgetMedicalPaymentApproval.CPMS_AMOUNT = rowData.CPMS_AMOUNT;
            me.budgetMedicalPaymentApproval.CPMS_NAME = rowData.CPMS_NAME;
            me.budgetMedicalPaymentApproval.FINANCE_YEAR = rowData.FINANCE_YEAR;
            me.budgetMedicalPaymentApproval.DEPT_CODE = rowData.DEPT_CODE;
            me.budgetMedicalPaymentApproval.BUDGET_ID = rowData.BUDGET_ID;
            me.budgetMedicalPaymentApproval.TOTAL_MONEY = rowData.PAYOUT_BUD;
            me.budgetMedicalPaymentApproval.AVAILABLE_MONEY = rowData.BALANCE;
            me.budgetMedicalPaymentApproval.CONSTRACT_DATE = rowData.CONSTRACT_DATE;
            if (!rowData.BILL_LEVEL) {
                me.budgetMedicalPaymentApproval.BILL_LEVEL = rowData.BILL_LEVEL + "";
            } else {
                me.budgetMedicalPaymentApproval.BILL_LEVEL = rowData.BILL_LEVEL;
            }
            me.budgetMedicalPaymentApproval.FUND_DEPT_CODE = rowData.FUND_DEPT_CODE;
            me.budgetMedicalPaymentApproval.INITIATOR = rowData.INITIATOR;
            me.budgetMedicalPaymentApproval.CPMS_PARTY_A = rowData.CPMS_PARTY_A;
            me.budgetMedicalPaymentApproval.CPMS_PARTY_B = rowData.CPMS_PARTY_B;
            me.budgetMedicalPaymentApproval.PAYABLE_MONEY = rowData.PAYABLE_MONEY;
            me.budgetMedicalPaymentApproval.PAID_MONEY = rowData.PAID_MONEY;
            me.budgetMedicalPaymentApproval.CUMULATIVE_INVOICE = rowData.CUMULATIVE_INVOICE;
            me.budgetMedicalPaymentApproval.CUMULATIVE_RECEIPT = rowData.CUMULATIVE_RECEIPT;
            me.budgetMedicalPaymentApproval.PLAN_PAYMENT_DATE = rowData.PLAN_PAYMENT_DATE;
            me.budgetMedicalPaymentApproval.PAYMENT_MONEY = rowData.PAYMENT_MONEY;
            me.budgetMedicalPaymentApproval.MEMO = rowData.MEMO;
            me.budgetMedicalPaymentApproval.SUPPLIER_INFO_ID = rowData.SUPPLIER;
            me.budgetMedicalPaymentApproval.BANK_ACCOUNT = rowData.BANK;
            me.budgetMedicalPaymentApproval.COLLECTION_ACCOUNT = rowData.BANKNO;
            me.budgetMedicalPaymentApproval.PAY_WAY = rowData.PAY_WAY;
            me.budgetMedicalPaymentApproval.CONTACT = rowData.CONTACT;
            me.budgetMedicalPaymentApproval.CONTACT_TEL = rowData.CONTACT_TEL;
            me.budgetMedicalPaymentApproval.INVOICE_MONEY = rowData.INVOICE_MONEY;
            me.budgetMedicalPaymentApproval.RECEIPT_MONEY = rowData.RECEIPT_MONEY;
        },
        initPaymentApprInfo: function(rowData) {
            var me = this;
            for (var i = 0; i < rowData.total; i++) {
                var reason = rowData["rows"][i].REVIEW_REASON + " （" + rowData["rows"][i].REVIEWER_NAME +
                    " " + rowData["rows"][i].REVIEW_DATE + "）";
                if ("BUD_PAYMENT_FINAL" == rowData["rows"][i].STEP_FLAG) { //科室负责人
                    me.budgetMedicalPaymentApproval.DEPT_PRINCIPAL = reason;
                } else if ("BUD_PAYMENT_FINAL_D1" == rowData["rows"][i].STEP_FLAG) { //职能部门
                    me.budgetMedicalPaymentApproval.FUNC_DEPT = reason;
                } else if ("BUD_PAYMENT_FINAL_D2" == rowData["rows"][i].STEP_FLAG) { //财务部审核
                    me.budgetMedicalPaymentApproval.FINANCE_CHECK = reason;
                } else if ("BUD_PAYMENT_FINAL_D3" == rowData["rows"][i].STEP_FLAG) { //主管院领导
                    me.budgetMedicalPaymentApproval.CHIEC_FINAL = reason;
                } else if ("BUD_PAYMENT_FINAL_D4" == rowData["rows"][i].STEP_FLAG) { //院长
                    me.budgetMedicalPaymentApproval.DEAN = reason;
                } else if ("BUD_PAYMENT_FINAL_D5" == rowData["rows"][i].STEP_FLAG) { //医疗集团董事长
                    me.budgetMedicalPaymentApproval.MEDICAL_GROUP = reason;
                } else if ("BUD_PAYMENT_FINAL_D6" == rowData["rows"][i].STEP_FLAG) { //控股集团董事长
                    me.budgetMedicalPaymentApproval.HOLDING_GROUP = reason;
                } else if ("BUD_PAYMENT_FINAL_END" == rowData["rows"][i].STEP_FLAG) { //财务部执行、归档
                    me.budgetMedicalPaymentApproval.FINANCE_EXE = reason;
                }
            }
        },
        initDeptInfo: function() {
            var me = this;
            var object = {
                'height': '300',
                'idField': 'DEPT_CODE',
                'textField': 'DEPT_NAME',
                'remoteSort': true,
                'url': this.comboGridActionUrl + 'CommComboGridCols',
                'params': {
                    'table': "(SELECT V.DEPT_CODE, V.DEPT_NAME\n" +
                        "  FROM V_BUD_DEPT_INFO_ATTR_YEAR V\n" +
                        " WHERE V.VISIBLE_INDICATOR = 1\n" +
                        "   AND V.BUD_EDIT = 1\n" +
                        "   AND V.FINANCE_YEAR = '" + this.bgtYear + "')",
                    'id': 'DEPT_CODE',
                    'text': 'DEPT_NAME'
                },
                'columns': [{
                    'prop': 'DEPT_CODE',
                    'label': '部门编码'
                }, {
                    'prop': 'DEPT_NAME',
                    'label': '部门名称'
                }]
            };
            this.budgetDeptInfoConfig = object;
        },
        changeAvaliableMoney: function(newVal, oldVal, row) {
            var me = this;
            var avaliableMoney = me.balanceMoney - newVal;
            me.budgetMedicalPaymentApproval.AVAILABLE_MONEY = avaliableMoney.toFixed(2);
        },
        getDeptInfo: function(newVal, oldVal, row) {
            var me = this;
            me.bgtYear = newVal;
            me.initDeptInfo();
        },
        initAttachInfo: function(rowData) {
            var me = this;
            me.budgetMedicalPaymentApproval.ATTACHMENT = rowData;
        }
    }
};