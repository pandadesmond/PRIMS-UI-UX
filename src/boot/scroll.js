export default ({ app, router, store }) => {

  let routes = router.options.routes

  let filtered = routes.filter(e => e.path.includes('crmdash'))

  // if (filtered.length > 0){

  //   var timeoutId;
  //   var prevScrollY = 0;

  //   window.addEventListener('scroll', function() {
  //     showScrollbar();
  //   });

  //   window.addEventListener('mousemove', function() {
  //     showScrollbar();
  //   });

  //   window.addEventListener('wheel', function() {
  //     showScrollbar();
  //   });

  //   function hideScrollbar() {
  //     document.documentElement.style.cursor = 'default';
  //     document.documentElement.style.overflowY = 'hidden';
  //   }

  //   function showScrollbar() {
  //     document.documentElement.style.cursor = 'auto';
  //     document.documentElement.style.overflowY = 'scroll';
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(hideScrollbar, 2000);
  //   }

  //   setInterval(function() {
  //     var scrollY = document.documentElement.scrollTop;

  //     if (scrollY !== prevScrollY) {
  //       showScrollbar();
  //       prevScrollY = scrollY;
  //     }
  //   }, 16);
  // }

}
