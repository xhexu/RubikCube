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