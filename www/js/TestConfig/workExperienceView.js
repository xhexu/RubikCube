/**
 * 自定义标签调用
 * @param aGET
 * @returns
 */
var _getParentValues = function(aGET){
    var valuesMap = {
        USER_CODE:'user_code',
        USER_ID:'user_id',
        USER_NAME:'userNamekh',
        ISAUDIT:'isAudit',
        HOST_NAME:'HOST_NAME',
        ifMaintain:'ifMaintain_URL',
        sysParam:'sysParam',
        hospitalAttribute:'hospitalAttribute',
        paramNz:'paramNz',
        checkParam:'checkParam',
        hospital:'hospital',
        propertySource:'propertySource',
        opeFlag : 'opeFlag',
        BAR_FLAG : 'BAR_FLAG'
    }
    for(var i in valuesMap){
        !aGET.hasOwnProperty(i) && (aGET[i] = window.parent[valuesMap[i]])
    }
    return aGET;
}

var _getURLCUSTOMTAB = function() {
    var aQuery = window.location.href.split("?"); // 取得Get参数
    var aGET = new Array();
    if (aQuery.length > 1) {
        var aBuf = aQuery[1].split("&");
        for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
            var aTmp = aBuf[i].split("="); // 分离key与Value
            aGET[aTmp[0]] = aTmp[1];
        }
    }
    aGET = this._getParentValues(aGET)
    return aGET;
}


var urlParams = _getURLCUSTOMTAB(),
    hrCommAction = hostName + "/HR/HrComm/HrCommHandler.jspx?moduleNo=" + "" + "&op=";
var HR_WORK_EXPERIENCE_VIEW = {
    data: function(){
        var urlParams = _getURLCUSTOMTAB();
        var PAGE_FALG = urlParams.IF_EDIT == 1?'E':urlParams.BAR_FLAG,
            menuFlag = {
                C:'DA',
                E:'RY'
            }[PAGE_FALG] || 'EM';
        return{
            // menuFlag: menuFlag,

            urlParams:_getURLCUSTOMTAB(),
            /*hrCommAction:hostName + "/HR/HrComm/HrCommHandler.jspx?moduleNo="
            + moduleNo + "&op=",*/
        }
    },
    created: function(){
      var me = this;
      me.$bus.$on('clearTree', function(){
          me.$refs['deptTree'].setCurrentKey(null); //取消树选中
      })
    },
    methods: {
        onNodeClick: function(node){
            if(node.attributes.SERIAL_NO) {
                urlParams.DEPT_GLOBAL_NO = node.attributes.SERIAL_NO;
                this.$bus.$emit('nodeClick', node);
            }
        }
    },
    element: function () {
        return [{
            type: 'page',
            code: 'workexperienceView',
            props: {
                isShow: urlParams.PAGE_FALG != 'E' || urlParams.USER_ID,
            },
            children: [{
                type: 'container',
                code: 'container',
                children: [{
                    type: 'aside',
                    code: 'aside',
                    props:{
                        $isShow: "['C','E'].indexOf(urlParams.BAR_FLAG) < 0",
                        title:'编制部门'
                    },
                    children: [{
                        type:'tree',
                        code:'deptTree',
                        props:{
                        	nodeKey: 'id',
                            highlightCurrent: true,
                            defaultExpandAll: true,
                            defaultExpandedLevel:2,
                            props: {
                                children: 'children',
                                label: 'text',
                                icon: 'icon'
                            },
                            url:hrCommAction + "GetDeptTree&limit=" + true+"&ORG_ID=",
                        },
                        on:{
                            'node-click': 'onNodeClick'
                        }
                    }]
                },{
                    type: 'main',
                    code: 'main',
                    children: [{
                        type:'view',
                        code:'workExperienceTable',
                        props:{
                            name:'HR_WORK_EXPERIENCE_TABLE'
                        }
                    }]
                }]
            }]
        }]
    }
}