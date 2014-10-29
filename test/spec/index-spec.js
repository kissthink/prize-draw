KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('prize-draw', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/prize-draw/1.0/']});