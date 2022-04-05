/**方法装饰器 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function fnClass(params) {
    return function (target, methodName, desc) {
        console.log(target);
        console.log(methodName);
        console.log(desc);
        // desc.value =  function () {
        //     console.log(11);
        // }
    };
}
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.name = 'sdf';
    }
    TestClass.prototype.getData = function () {
        console.log('geData方法');
    };
    __decorate([
        fnClass('xxx')
    ], TestClass.prototype, "getData");
    return TestClass;
}());
var classObj = new TestClass();
