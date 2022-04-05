/**方法装饰器 */

function fnClass(params:any) {
    return function (target:any, methodName: any, desc:PropertyDescriptor) {
        console.log(target);
        console.log(methodName);
        console.log(desc);
        // desc.value =  function () {
        //     console.log(11);
            
        // }
    }
}


class TestClass {
    name: string;
    constructor() {
        this.name = 'sdf';
    }
    @fnClass('xxx')
    getData() {
        console.log('geData方法');
        
    }
}
const classObj = new TestClass();
