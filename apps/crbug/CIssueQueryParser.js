var CIssueQueryParser = {
  __proto__: QueryParserFactory(CIssue),

  stars: seq(literal_ic('stars:'), sym('number')),

  labelMatch: seq(sym('string'), alt(':', '='), sym('valueList'))

}.addActions({
  stars: function(v) {
    return GTE({
      f:function(i) { return i.stars.length;},
      partialEval: function() {return this;},
      toSQL: function() { return 'stars > ' + v[1]; },
      toMQL: function() { return 'stars > ' + v[1]; }
    }, v[1]);
  },

  labelMatch: function(v) {
    var or = OR();
    var values = v[2];
    for ( var i = 0 ; i < values.length ; i++ ) {
      or.args.push(CONTAINS_IC(CIssue.LABELS, v[0] + '-' + values[i]));
    }
    return or;
  }
});

CIssueQueryParser.expr = alt(
  CIssueQueryParser.export('expr'),
  sym('stars'),
  sym('labelMatch')
);

/*
function test(query) {
  console.log('QueryParserTest: ' + query);
  var res = CIssueQueryParser.parseString(query);
  console.log('query: ', query, ' -> ', res && res.toSQL());
}

test('priority=0');
test('priority=0,1,2');
test('priority:0');
test('1234567');
test('status:Assigned');
test('status:Assigned priority:0');
test('Iteration:29');
test('Type:Bug');
test('');
*/

// label:Priority-High = Priority:High
// blockeon:NNN
// blocking:NNN
// is:blocked
// Priority:High,Medium = Priority:High OR Priority:Medium
// is:starred
// stars: 3  at least three users have starred
// "contains text"
// has:attachment
// attachment:screenshot or attachment:png

// consider
//  < and > support (done)
//  limit:# support
//  format:table/grid/csv/xml/json
//  orderBy:((-)field)+
