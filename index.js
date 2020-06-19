"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/** arg의 값을 캡쳐해 타입으로 사용한다. */
function identity(arg) {
    return arg;
}
;
var test = identity("asdf");
function loggingIdentity(arg) {
    console.log(arg.length); // Error: T doesn't have .length
    return arg;
}
/**  */
var myIdentity1 = identity;
var myIdentity2 = identity;
var myIdentity3 = identity;
var myIdentity4 = identity;
var myIdentity = identity;
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
function loggingIdentity123(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4, asdfasdf: "adsfasdf" };
getProperty(x, "asdfasdf");
function updateTodo(todo, fieldsToUpdate) {
    // todo, fieldToUpdate 두개 모두 값이 있을경우 오른쪽 값이 할당됩니다.
    return __assign(__assign({}, todo), fieldsToUpdate);
}
var ffffasdf = {
    title: 'organize desk',
    description: 'clear clutter'
};
var todo2 = updateTodo(ffffasdf, {
    description: 'throw out trash'
});
var ff = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    home: { title: 'home' }
};
var FRIENDS_LIST = ["harry", "jason", "dukkey"];
var todo = {
    title: 'Clean room'
};
var Omittodo = {
    title: 'Clean room',
    completed: false
};
var productList = {
    SONATA: { name: "SONATA", price: 10000 },
    AVANTE: { name: "SONATA", price: 10000 }
};
var nextProductList = {
    SONATA: { name: "SONATA", price: 10000 },
    AVANTE1: { name: "SONATA", price: 10000 },
    AVANTE2: { name: "SONATA", price: 10000 },
    AVANTE3: { name: "SONATA", price: 10000 }
};
var HTMLCategory = ["HTML", "Pug"];
function testFunction(category, desc) {
}
testFunction("SQL", "Pug");
