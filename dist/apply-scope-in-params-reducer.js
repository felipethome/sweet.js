"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _terms = require("./terms");

var _terms2 = _interopRequireDefault(_terms);

var _symbol = require("./symbol");

var _transforms = require("./transforms");

var _errors = require("./errors");

var _syntax = require("./syntax");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ScopeApplyingReducer {
  constructor(scope_0, context_1) {
    this.context = context_1;
    this.scope = scope_0;
  }
  transform(term_2) {
    let field_3 = "transform" + term_2.type;
    if (typeof this[field_3] === "function") {
      return this[field_3](term_2);
    }
    (0, _errors.assert)(false, "transform not implemented yet for: " + term_2.type);
  }
  transformFormalParameters(term_4) {
    let rest_5 = term_4.rest == null ? null : this.transform(term_4.rest);
    return new _terms2.default("FormalParameters", { items: term_4.items.map(it_6 => this.transform(it_6)), rest: rest_5 });
  }
  transformBindingWithDefault(term_7) {
    return new _terms2.default("BindingWithDefault", { binding: this.transform(term_7.binding), init: term_7.init });
  }
  transformObjectBinding(term_8) {
    return term_8;
  }
  transformBindingPropertyIdentifier(term_9) {
    return new _terms2.default("BindingPropertyIdentifier", { binding: this.transform(term_9.binding), init: term_9.init });
  }
  transformBindingPropertyProperty(term_10) {
    return new _terms2.default("BindingPropertyProperty", { name: term_10.name, binding: this.transform(term_10.binding) });
  }
  transformArrayBinding(term_11) {
    return new _terms2.default("ArrayBinding", { elements: term_11.elements.map(el_12 => this.transform(el_12)), restElement: term_11.restElement == null ? null : this.transform(term_11.restElement) });
  }
  transformBindingIdentifier(term_13) {
    let name_14 = term_13.name.addScope(this.scope, this.context.bindings, _syntax.ALL_PHASES);
    let newBinding_15 = (0, _symbol.gensym)(name_14.val());
    this.context.env.set(newBinding_15.toString(), new _transforms.VarBindingTransform(name_14));
    this.context.bindings.add(name_14, { binding: newBinding_15, phase: this.context.phase, skipDup: true });
    return new _terms2.default("BindingIdentifier", { name: name_14 });
  }
}
exports.default = ScopeApplyingReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N3ZWV0L2FwcGx5LXNjb3BlLWluLXBhcmFtcy1yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDZSxNQUFNLG9CQUFOLENBQTJCO0FBQ3hDLGNBQVksT0FBWixFQUFxQixTQUFyQixFQUFnQztBQUM5QixTQUFLLE9BQUwsR0FBZSxTQUFmO0FBQ0EsU0FBSyxLQUFMLEdBQWEsT0FBYjtBQUNEO0FBQ0QsWUFBVSxNQUFWLEVBQWtCO0FBQ2hCLFFBQUksVUFBVSxjQUFjLE9BQU8sSUFBbkM7QUFDQSxRQUFJLE9BQU8sS0FBSyxPQUFMLENBQVAsS0FBeUIsVUFBN0IsRUFBeUM7QUFDdkMsYUFBTyxLQUFLLE9BQUwsRUFBYyxNQUFkLENBQVA7QUFDRDtBQUNELHdCQUFPLEtBQVAsRUFBYyx3Q0FBd0MsT0FBTyxJQUE3RDtBQUNEO0FBQ0QsNEJBQTBCLE1BQTFCLEVBQWtDO0FBQ2hDLFFBQUksU0FBUyxPQUFPLElBQVAsSUFBZSxJQUFmLEdBQXNCLElBQXRCLEdBQTZCLEtBQUssU0FBTCxDQUFlLE9BQU8sSUFBdEIsQ0FBMUM7QUFDQSxXQUFPLG9CQUFTLGtCQUFULEVBQTZCLEVBQUMsT0FBTyxPQUFPLEtBQVAsQ0FBYSxHQUFiLENBQWlCLFFBQVEsS0FBSyxTQUFMLENBQWUsSUFBZixDQUF6QixDQUFSLEVBQXdELE1BQU0sTUFBOUQsRUFBN0IsQ0FBUDtBQUNEO0FBQ0QsOEJBQTRCLE1BQTVCLEVBQW9DO0FBQ2xDLFdBQU8sb0JBQVMsb0JBQVQsRUFBK0IsRUFBQyxTQUFTLEtBQUssU0FBTCxDQUFlLE9BQU8sT0FBdEIsQ0FBVixFQUEwQyxNQUFNLE9BQU8sSUFBdkQsRUFBL0IsQ0FBUDtBQUNEO0FBQ0QseUJBQXVCLE1BQXZCLEVBQStCO0FBQzdCLFdBQU8sTUFBUDtBQUNEO0FBQ0QscUNBQW1DLE1BQW5DLEVBQTJDO0FBQ3pDLFdBQU8sb0JBQVMsMkJBQVQsRUFBc0MsRUFBQyxTQUFTLEtBQUssU0FBTCxDQUFlLE9BQU8sT0FBdEIsQ0FBVixFQUEwQyxNQUFNLE9BQU8sSUFBdkQsRUFBdEMsQ0FBUDtBQUNEO0FBQ0QsbUNBQWlDLE9BQWpDLEVBQTBDO0FBQ3hDLFdBQU8sb0JBQVMseUJBQVQsRUFBb0MsRUFBQyxNQUFNLFFBQVEsSUFBZixFQUFxQixTQUFTLEtBQUssU0FBTCxDQUFlLFFBQVEsT0FBdkIsQ0FBOUIsRUFBcEMsQ0FBUDtBQUNEO0FBQ0Qsd0JBQXNCLE9BQXRCLEVBQStCO0FBQzdCLFdBQU8sb0JBQVMsY0FBVCxFQUF5QixFQUFDLFVBQVUsUUFBUSxRQUFSLENBQWlCLEdBQWpCLENBQXFCLFNBQVMsS0FBSyxTQUFMLENBQWUsS0FBZixDQUE5QixDQUFYLEVBQWlFLGFBQWEsUUFBUSxXQUFSLElBQXVCLElBQXZCLEdBQThCLElBQTlCLEdBQXFDLEtBQUssU0FBTCxDQUFlLFFBQVEsV0FBdkIsQ0FBbkgsRUFBekIsQ0FBUDtBQUNEO0FBQ0QsNkJBQTJCLE9BQTNCLEVBQW9DO0FBQ2xDLFFBQUksVUFBVSxRQUFRLElBQVIsQ0FBYSxRQUFiLENBQXNCLEtBQUssS0FBM0IsRUFBa0MsS0FBSyxPQUFMLENBQWEsUUFBL0MscUJBQWQ7QUFDQSxRQUFJLGdCQUFnQixvQkFBTyxRQUFRLEdBQVIsRUFBUCxDQUFwQjtBQUNBLFNBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBYyxRQUFkLEVBQXJCLEVBQStDLG9DQUF3QixPQUF4QixDQUEvQztBQUNBLFNBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsR0FBdEIsQ0FBMEIsT0FBMUIsRUFBbUMsRUFBQyxTQUFTLGFBQVYsRUFBeUIsT0FBTyxLQUFLLE9BQUwsQ0FBYSxLQUE3QyxFQUFvRCxTQUFTLElBQTdELEVBQW5DO0FBQ0EsV0FBTyxvQkFBUyxtQkFBVCxFQUE4QixFQUFDLE1BQU0sT0FBUCxFQUE5QixDQUFQO0FBQ0Q7QUFyQ3VDO2tCQUFyQixvQiIsImZpbGUiOiJhcHBseS1zY29wZS1pbi1wYXJhbXMtcmVkdWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXJtIGZyb20gXCIuL3Rlcm1zXCI7XG5pbXBvcnQge2dlbnN5bX0gZnJvbSBcIi4vc3ltYm9sXCI7XG5pbXBvcnQge1ZhckJpbmRpbmdUcmFuc2Zvcm19IGZyb20gXCIuL3RyYW5zZm9ybXNcIjtcbmltcG9ydCB7YXNzZXJ0fSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7QUxMX1BIQVNFU30gZnJvbSBcIi4vc3ludGF4XCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29wZUFwcGx5aW5nUmVkdWNlciB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlXzAsIGNvbnRleHRfMSkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHRfMTtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGVfMDtcbiAgfVxuICB0cmFuc2Zvcm0odGVybV8yKSB7XG4gICAgbGV0IGZpZWxkXzMgPSBcInRyYW5zZm9ybVwiICsgdGVybV8yLnR5cGU7XG4gICAgaWYgKHR5cGVvZiB0aGlzW2ZpZWxkXzNdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiB0aGlzW2ZpZWxkXzNdKHRlcm1fMik7XG4gICAgfVxuICAgIGFzc2VydChmYWxzZSwgXCJ0cmFuc2Zvcm0gbm90IGltcGxlbWVudGVkIHlldCBmb3I6IFwiICsgdGVybV8yLnR5cGUpO1xuICB9XG4gIHRyYW5zZm9ybUZvcm1hbFBhcmFtZXRlcnModGVybV80KSB7XG4gICAgbGV0IHJlc3RfNSA9IHRlcm1fNC5yZXN0ID09IG51bGwgPyBudWxsIDogdGhpcy50cmFuc2Zvcm0odGVybV80LnJlc3QpO1xuICAgIHJldHVybiBuZXcgVGVybShcIkZvcm1hbFBhcmFtZXRlcnNcIiwge2l0ZW1zOiB0ZXJtXzQuaXRlbXMubWFwKGl0XzYgPT4gdGhpcy50cmFuc2Zvcm0oaXRfNikpLCByZXN0OiByZXN0XzV9KTtcbiAgfVxuICB0cmFuc2Zvcm1CaW5kaW5nV2l0aERlZmF1bHQodGVybV83KSB7XG4gICAgcmV0dXJuIG5ldyBUZXJtKFwiQmluZGluZ1dpdGhEZWZhdWx0XCIsIHtiaW5kaW5nOiB0aGlzLnRyYW5zZm9ybSh0ZXJtXzcuYmluZGluZyksIGluaXQ6IHRlcm1fNy5pbml0fSk7XG4gIH1cbiAgdHJhbnNmb3JtT2JqZWN0QmluZGluZyh0ZXJtXzgpIHtcbiAgICByZXR1cm4gdGVybV84O1xuICB9XG4gIHRyYW5zZm9ybUJpbmRpbmdQcm9wZXJ0eUlkZW50aWZpZXIodGVybV85KSB7XG4gICAgcmV0dXJuIG5ldyBUZXJtKFwiQmluZGluZ1Byb3BlcnR5SWRlbnRpZmllclwiLCB7YmluZGluZzogdGhpcy50cmFuc2Zvcm0odGVybV85LmJpbmRpbmcpLCBpbml0OiB0ZXJtXzkuaW5pdH0pO1xuICB9XG4gIHRyYW5zZm9ybUJpbmRpbmdQcm9wZXJ0eVByb3BlcnR5KHRlcm1fMTApIHtcbiAgICByZXR1cm4gbmV3IFRlcm0oXCJCaW5kaW5nUHJvcGVydHlQcm9wZXJ0eVwiLCB7bmFtZTogdGVybV8xMC5uYW1lLCBiaW5kaW5nOiB0aGlzLnRyYW5zZm9ybSh0ZXJtXzEwLmJpbmRpbmcpfSk7XG4gIH1cbiAgdHJhbnNmb3JtQXJyYXlCaW5kaW5nKHRlcm1fMTEpIHtcbiAgICByZXR1cm4gbmV3IFRlcm0oXCJBcnJheUJpbmRpbmdcIiwge2VsZW1lbnRzOiB0ZXJtXzExLmVsZW1lbnRzLm1hcChlbF8xMiA9PiB0aGlzLnRyYW5zZm9ybShlbF8xMikpLCByZXN0RWxlbWVudDogdGVybV8xMS5yZXN0RWxlbWVudCA9PSBudWxsID8gbnVsbCA6IHRoaXMudHJhbnNmb3JtKHRlcm1fMTEucmVzdEVsZW1lbnQpfSk7XG4gIH1cbiAgdHJhbnNmb3JtQmluZGluZ0lkZW50aWZpZXIodGVybV8xMykge1xuICAgIGxldCBuYW1lXzE0ID0gdGVybV8xMy5uYW1lLmFkZFNjb3BlKHRoaXMuc2NvcGUsIHRoaXMuY29udGV4dC5iaW5kaW5ncywgQUxMX1BIQVNFUyk7XG4gICAgbGV0IG5ld0JpbmRpbmdfMTUgPSBnZW5zeW0obmFtZV8xNC52YWwoKSk7XG4gICAgdGhpcy5jb250ZXh0LmVudi5zZXQobmV3QmluZGluZ18xNS50b1N0cmluZygpLCBuZXcgVmFyQmluZGluZ1RyYW5zZm9ybShuYW1lXzE0KSk7XG4gICAgdGhpcy5jb250ZXh0LmJpbmRpbmdzLmFkZChuYW1lXzE0LCB7YmluZGluZzogbmV3QmluZGluZ18xNSwgcGhhc2U6IHRoaXMuY29udGV4dC5waGFzZSwgc2tpcER1cDogdHJ1ZX0pO1xuICAgIHJldHVybiBuZXcgVGVybShcIkJpbmRpbmdJZGVudGlmaWVyXCIsIHtuYW1lOiBuYW1lXzE0fSk7XG4gIH1cbn1cbiJdfQ==