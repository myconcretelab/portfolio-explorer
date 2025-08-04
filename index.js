(function(blocks, element, blockEditor){
    var el = element.createElement;
    var useState = element.useState;
    var useEffect = element.useEffect;
    var useBlockProps = blockEditor.useBlockProps;

     function PortfolioExplorer(){
         console.log('PortfolioExplorer component mounted');
         var _a = useState([]), tree = _a[0], setTree = _a[1];
         var _b = useState(null), current = _b[0], setCurrent = _b[1];
         var _c = useState([]), path = _c[0], setPath = _c[1];

         useEffect(function(){
             console.log('Fetching portfolio tree...');
             fetch('/wp-json/portfolio/v1/tree').then(function(res){
                 console.log('Portfolio tree response', res);
                 return res.json();
             }).then(function(data){
                 console.log('Received tree data', data);
                 setTree(data);
                 setCurrent({ name: 'Racine', children: data, images: [] });
             }).catch(function(err){
                 console.error('Failed to load portfolio tree', err);
             });
         }, []);

         function openFolder(folder){
             console.log('Opening folder', folder);
             setPath(path.concat([folder]));
             setCurrent(folder);
         }

         function goTo(index){
             console.log('Navigating to index', index);
             var newPath = path.slice(0, index);
             var folder = index === 0 ? { name: 'Racine', children: tree, images: [] } : path[index-1];
             setPath(newPath);
             setCurrent(folder);
         }

         if(!current){
             console.log('Current folder not set yet, showing loader');
             return el('div', {className: 'portfolio-loader'}, 'Chargement...');
         }

        var breadcrumbs = el('div', {className: 'portfolio-breadcrumbs'},
            [el('span', {key: 'root', onClick: function(){ setPath([]); setCurrent({ name: 'Racine', children: tree, images: [] }); }}, 'Racine')]
            .concat(path.map(function(p, i){
                return el('span', {key: p.id, onClick: function(){ goTo(i+1); }}, ' / ' + p.name);
            }))
        );

        var folderMeta = el('div', {className: 'portfolio-folder-meta'}, [
            current.thumb ? el('img', {src: current.thumb, alt: current.name}) : null,
            current.description ? el('p', null, current.description) : null
        ]);

        var folders = current.children && current.children.length ? el('ul', {className: 'portfolio-tree'},
            current.children.map(function(child){
                return el('li', {key: child.id, onClick: function(){ openFolder(child); }}, [
                    child.thumb ? el('img', {src: child.thumb, alt: child.name}) : null,
                    child.name
                ]);
            })
        ) : null;

        var images = current.images && current.images.length ? el('div', {className: 'portfolio-grid'},
            current.images.map(function(img){
                return el('img', {key: img.id, src: img.thumb || img.url, alt: img.title});
            })
        ) : null;

        return el('div', {className: 'portfolio-app'}, [breadcrumbs, folderMeta, folders, images]);
    }

    blocks.registerBlockType('portfolio/explorer', {
        title: 'Portfolio Explorer',
        icon: 'images-alt2',
        category: 'widgets',
        edit: function(){
            var blockProps = useBlockProps();
            return el('div', blockProps, el(PortfolioExplorer));
        },
        save: function(){
            return el('div', useBlockProps.save());
        }
    });

     if(typeof document !== 'undefined' && !document.body.classList.contains('wp-admin')){
         document.addEventListener('DOMContentLoaded', function(){
             console.log('DOM ready, initializing portfolio explorer blocks');
             document.querySelectorAll('.wp-block-portfolio-explorer').forEach(function(node){
                 console.log('Rendering PortfolioExplorer in node', node);
                 element.render(el(PortfolioExplorer), node);
             });
         });
     }

})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
