$(function(){
    function setActive( $parent, $this ){
        $parent.find('.active').removeClass('active');
        $this.addClass('active');
    }

    function nav(){
        var $nav = $('.header .nav');
        var $active = $nav.find('.active');
        var $slideblock = $nav.find('.slideblock');

        setSlideblock( $active );
        setTimeout(function(){
            $slideblock.addClass('animation').removeClass('hidden');
        }, 0 );

        $nav.find('a').hover(function(){
            changeActive( $(this) );
        }, function(){
            changeActive( $active );
        });

        $(window).resize(function(){
            clearTimeout( this.timer );
            this.timer = setTimeout(function(){
                setSlideblock( $nav.find('.active') );
            }, 400 );
        });

        function changeActive( $el ){
            setActive( $nav, $el );
            setSlideblock( $el );
        }

        function setSlideblock( $el ){
            var l = $el.position().left + parseInt($el.css('paddingLeft')) + .5;
            $slideblock.css({
                width: $el.width(),
                transform: 'translate('+ l +'px,0)'
            });
        }
    }
    nav();

    $('#open').click(function(){
        d.open();
    });
    $('#pause').click(function(){
        d.pause();
    });

    function loadjs( url, callback ){
        var script = document.createElement('script');
        script.onload = callback;
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild( script );
    }

    function loadcss( url, callback ){
        var link = document.createElement('link');
        link.onload = callback;
        link.href = url;
        link.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild( link );
    }

    loadcss('//cdn.bootcss.com/prettify/r298/prettify.min.css');
    loadjs( '//cdn.bootcss.com/prettify/r298/prettify.min.js', function(){
        if( $('.prettyprint').length ){
            prettyPrint();
        }else if( $('.quick-getting').length ){
            'import use use-method config-default'.split(' ').forEach(function( v ){
                $.get('/code-demo/'+ v +'.html', function( msg ){
                    $( '.' + v ).text( msg ).addClass( 'prettyprint' );
                    prettyPrint();
                    if( v === 'use' ){
                        window.d = new Particleground.particle( '#demo', {
                            dis: 80,
                            range: 60
                        });
                    }
                });
            });
        }
    });

    if( !/\/examples\/quick-getting/i.test( location.href ) ){
        if( !window.localStorage.getItem( 'read' ) ){
            $('.eg-container >.menu >h5:eq(1)').append('<i class="essential pa">必读</i>');
        }
    }else{
        window.localStorage.setItem( 'read', true );
    }
});