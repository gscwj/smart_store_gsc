
const ApiUtil = {
    /*以多次调用的最后一次为准执行，调用频率用setTimeOut的延迟时间为实*/
    filtrationFunc:function (func, time) {
        let _that_ = this;
        let init = function () {
            _that_.filtrationFunc.init = true;
            _that_.filtrationFunc.filtration_init = 0;
            _that_.filtrationFunc.filtration_count = 0;
        };
        if(!_that_.filtrationFunc.init){
            console.log("第一次进入");
            init();
        }
        _that_.filtrationFunc.filtration_count += 1;/*虚拟进栈*/
        setTimeout(function () {
            _that_.filtrationFunc.filtration_count -= 1;/*虚拟出栈*/
            if(_that_.filtrationFunc.filtration_count === _that_.filtrationFunc.filtration_init){
                console.log("真正执行处理函数");
                func();
                _that_.filtrationFunc.init = false;
            }
        },time)
    },
    /*数组转换成树*/
    arr2tree:function (arr_src, self_param, parent_param, set_parent) {
        let tree_arr = JSON.parse(JSON.stringify(arr_src));
        console.log('tree_arr =',JSON.parse(JSON.stringify(arr_src)));
        /*
        return 查找到的数据对象
        在arr_src中查找指定的value值，根据param属性*/
        var FindByParam = function (arr_src, value, param) {
            if(!arr_src){
                return null;
            }
            try{
                for(let i in arr_src){
                    // debugger;
                    let _item_ = arr_src[i];
                    if(_item_){
                        if(_item_[param] === value){
                            return _item_;
                        }
                        let res = FindByParam(_item_.children,value,param);
                        if(res){
                            return res;
                        }
                    }
                }
            }catch (e) {
                return null;
            }
            return null;
        };
        /*
        * 为对象添加子节点
        * */
        let AddChild = function (obj, child_obj) {
            if(!obj.children){
                obj.children = [];
            }
            obj.children.push(child_obj);
        };
        /*主流程*/
        try{
            for(let i in tree_arr){
                // console.log("i =",i);
                let _item__ = tree_arr[i];
                console.log(`_item__${i} =`,_item__);
                if(!_item__){
                    continue;
                }
                let parentParamValue = _item__[parent_param];/*当前节点父ID的值*/
                console.log(`${i}. parentParamValue = ${parentParamValue}`);
                /*查到以父ID的值为目标值，以自身ID属性为目标属性查询到tree_arr数组中的数据对象*/
                let res = FindByParam(tree_arr,parentParamValue,self_param);/*找到当前数组中有子节点的父节点*/
                /*此时_item__为res下的子节点*/
                console.log(`${i}. res =`,res);
                if(res){/*如果当前节点有父节点*/
                    if(set_parent){
                        _item__.parentObj = res;
                    }
                    AddChild(res, _item__);
                    tree_arr[i] = null;
                }
            }
            tree_arr = tree_arr.filter(item=>item);
        }catch (e) {
            tree_arr = arr_src;
            console.error(e);
        }finally {
            return tree_arr;
        }
    },
    /*树转换成数组*/
    tree2arr:function (tree_arr, child_param, param, split_char) {
        var array = [];
        split_char = !split_char?'':' ';
        var forChildren = function (array, tree_arr) {
            for(let i in tree_arr){
                console.log(`${i}`);
                if(param){
                    tree_arr[i][param] = split_char+tree_arr[i][param];
                }
                let obj_tmp = {};
                let keys = Object.keys(tree_arr[i]);
                for(let ki in keys){
                    if(keys[ki]!=='children'){
                        obj_tmp[keys[ki]] = tree_arr[i][keys[ki]];
                    }
                }
                array.push(obj_tmp);
                var tmp = split_char;
                split_char = split_char+split_char;
                forChildren(array,tree_arr[i][child_param]);
                split_char = tmp;
            }
        };
        forChildren(array, tree_arr);
        return array;
    },
    /*从树中找关联关系，生成所能关联对象的父级对象数组*/
    getCascadeMarksFromTree:function (obj, includeSelf) {
        var cascadMarks = [];
        var found = false;

        /*
        * 递归遍历整个树，找到关联关系
        * tree 遍历树
        * cascadeRelative 子级所在数组的属性名
        * markName 关联关系的属性名（如 id）
        * foundMark 查找的对象的标识（如 id值）
        * */
        var getCascadeMarksFromTree = function (tree, cascadeRelative, markName, foundMark) {
            if(!tree){
                return;
            }
            for(let i in tree){
                let item = tree[i];
                if(item[markName] === foundMark){
                    found = true;
                }
                if(!found){
                    let children = item[cascadeRelative];
                    getCascadeMarksFromTree(children, cascadeRelative,markName,foundMark);
                    if(found){
                        cascadMarks.push(item);
                        return;
                    }
                }
                else{
                    if(includeSelf){
                        cascadMarks.push(item);
                    }
                    break;
                }
            }


        };
        getCascadeMarksFromTree(obj.tree, obj.cascadeRelative, obj.markName, obj.foundMark);
        this.arrayTransform(cascadMarks);
        return cascadMarks;
    },
    arrayTransform:function (array) {
        let len = array?array.length/2 : 0;
        for(let i=0; len-i>=1; i++){
            let temp=array[i];
            array[i] = array[array.length-1-i];
            array[array.length-1-i] = temp;
        }
    }

};

export default ApiUtil;