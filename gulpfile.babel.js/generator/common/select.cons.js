<% var option = param.templateOptions; %>
this.options.<%= param.key %> = <%= Array.isArray(option.options) ? helper.filterSelectData(option.options) : '[]' %>;
<% if(helper.selectIsHTTP(param)){ %>
this.<%= helper.getSelectFnName(param) %>();
<% } %>