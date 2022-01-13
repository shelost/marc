const PAGE =
[
{
    name: 'Selection', blurb: '', type: 'section', elems:
    [
        {
            name: 'Cardinal Direction', blurb: '', type: 'subsection', color: 'purple', elems:
                [{ type: 'pair', elems:
                    [{
                        name: 'rightmost', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the rightmost element(s)', type: 'function'
                    },{
                        name: 'leftmost', params: 'List<E>', return: 'E or List<E>',
                        blurb: 'Returns the leftmost element(s)', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'top', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the top element(s)', type: 'function'
                    },{
                        name: 'bottom', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the bottom element(s)', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'top_right', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the top right element(s)', type: 'function'
                    },{
                        name: 'top_left', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the top left element(s)', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'bottom_right', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the bottom right element(s)', type: 'function'
                    },{
                        name: 'bottom_left', params: 'List<E>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the bottom left element(s)', type: 'function'
                    }]
                }]
        },
        {
            name: 'Selection', blurb: '', type: 'subsection', color: 'purple', elems:
                [{ type: 'pair', elems:
                    [{
                        name: 'farthest', params: 'List<Point>', return: 'Pair<Point>', image: '',
                        blurb: 'Returns the two farthest points', type: 'function'
                    },{
                        name: 'closest', params: 'List<Point>', return: 'Pair<Point>', image: '',
                        blurb: 'Returns the two closest points', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'largest', params: 'List<Shape>', return: 'Shape', image: '',
                        blurb: 'Returns the largest shape by area', type: 'function'
                    },{
                        name: 'smallest', params: 'List<Shape>', return: 'Shape', image: '',
                        blurb: 'Returns the smallest shape by area', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'longest', params: 'List<Path>', return: 'P or List<Path>', image: '',
                        blurb: 'Returns the top right element(s)', type: 'function'
                    },{
                        name: 'shortest', params: 'List<Path>', return: 'P or List<Path>', image: '',
                        blurb: 'Returns the top left element(s)', type: 'function'
                    }]
                }]
        }
    ]
},
{
    name: 'Extrapolation', blurb: '', type: 'section', elems:
    [
        {
            name: 'Function', blurb: '', type: 'subsection', color: 'yellow', elems:
            [
                { type: 'pair', elems:
                    [{
                        name: 'intersections', params: 'List<E>', return: 'List<Point>', image: '',
                        blurb: 'Returns the intersections of multiple elements', type: 'function'
                    },
                    {
                        name: 'count', params: 'E', return: 'int', image: '',
                        blurb: 'Returns the number of a given element', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'concat', params: 'List<List>', return: 'List<E>', image: '',
                        blurb: 'Returns a combined list of all elements', type: 'function'
                    },{
                        name: 'common', params: 'List<List>', return: 'E or List<E>', image: '',
                        blurb: 'Returns the common element(s) of the given lists', type: 'function'
                    }]
                }
            ]
        },
        {
            name: 'Components', blurb: '', type: 'subsection', color: 'yellow', elems:
                [{
                    type: 'pair', elems:
                    [
                        {
                            name: 'edges', params: 'Shape / List<Shape>', return: 'List<Line>', image: '',
                            blurb: 'Returns the edges of a shape or shapes', type: 'function'
                        },
                        {
                            name: 'vertices', params: 'Polygon / List<Polygon>', return: 'List<Point>', image: '',
                            blurb: 'Returns the vertices of a shape or shapes', type: 'function'
                        }
                    ]
                },
                { type: 'pair', elems:
                    [{
                        name: 'points', params: 'Path / List<Path>', return: 'List<Point>', image: '',
                        blurb: 'Returns the points of a path', type: 'function'
                    },{
                        name: 'diagonals', params: 'List<Quadrilateral>', return: 'Pair<Line>', image: '',
                        blurb: 'Returns the diagonal lines of a quadrilateral', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'midpoint', params: 'Line', return: 'Point', image: '',
                        blurb: 'Returns the midpoint of a line', type: 'function'
                    },{
                        name: 'endpoint', params: 'Line', return: 'Pair<Point>', image: '',
                        blurb: 'Returns the endpoints of a line', type: 'function'
                    }]
                },{ type: 'pair', elems:
                [{
                    name: 'center', params: 'Shape', return: 'Point', image: '',
                    blurb: 'Returns the center of a shape', type: 'function'
                },{
                    name: 'endpoint', params: 'Line', return: 'Pair<Point>', image: '',
                    blurb: 'Returns the endpoints of a line', type: 'function'
                }]
            }]
        }
    ]
},
{
    name: 'Action', blurb: '', type: 'section', elems:
    [
        {
            name: 'Draw', blurb: '', type: 'subsection', color: 'pink', elems:
                [{ type: 'pair', elems:
                    [{
                        name: 'line', params: 'x1, y1, x2, y2 / Pair<Point>', return: null, image: '',
                        blurb: 'Draws a line between two points', type: 'function'
                    },{
                        name: 'polygon', params: 'List<Point>', return: null, image: '',
                        blurb: 'Draws a polygon connecting all the points in order', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'diagonal', params: 'Quadrilateral', return: null, image: '',
                        blurb: 'Draws a line from the top left vertex to the bottom right vertex', type: 'function'
                    },{
                        name: 'antidiagonal', params: 'Quadrilateral', return: null, image: '',
                        blurb: 'Draws a line from the top right vertex to the bottom left vertex', type: 'function'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'circle', params: 'Point c, Int r', return: null, image: '',
                        blurb: 'Draws a circle with center <span>c</span> & radius <span>r</span>', type: 'function'
                    },{
                        name: 'ellipse', params: 'Point c, int r1, int r2, int a', return: null, image: '', type: 'function',
                        blurb: 'Draws an ellipse with center <span>c</span>, major radius <span>r1</span>, minor radius <span>r2</span>, and rotation angle <span>a</span>'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'square', params: 'Point r, int k, [str s]', return: null, image: '', type: 'function',
                        blurb: `Draws a square with corner <span>r</span> (top-left by default or <span>s</span>),
                        and size <span>k</span>`
                    },{
                        name: 'rectangle', params: 'Point r, int w, int h, [str s]', return: null, image: '', type: 'function',
                        blurb: `Draws a rectangle with corner <span>r</span> (top-left by default or <span>s</span>),
                        width <span>w</span>, and height <span>h</span>`,
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'circle', params: 'Point c, Int r', return: null, image: '',
                        blurb: 'Draws a circle with center <span>c</span> & radius <span>r</span>', type: 'function'
                    },{
                        name: 'ellipse', params: 'Point c, int r1, int r2, int a', return: null, image: '', type: 'function',
                        blurb: 'Draws an ellipse with center <span>c</span>, major radius <span>r1</span>, minor radius <span>r2</span>, and rotation angle <span>a</span>'
                    }]
                },
                { type: 'pair', elems:
                    [{
                        name: 'square', params: 'Point r, int k, [str s]', return: null, image: '', type: 'function',
                        blurb: `Draws a square with corner <span>r</span> (top-left by default or <span>s</span>),
                        and size <span>k</span>`
                    },{
                        name: 'polygon', params: 'Point r, int w, int h, [str s]', return: null, image: '', type: 'function',
                        blurb: `Draws a rectangle with corner <span>r</span> (top-left by default or <span>s</span>),
                        width <span>w</span>, and height <span>h</span>`,
                    }]
                }
            ]
        }
    ]
},
]
