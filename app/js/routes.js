angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
    $stateProvider
      .state('anon', {
        abstract: true,
        data: {
          access: AccessLevels.anon
        },
        views: {
          'navbar@': {
            templateUrl: 'anon/navbar.html',
            controller: 'NavbarController'
          },
          'slider@': {
            templateUrl: 'anon/slider.html',
            controller: 'DisplaySlideShowController'
          },
          'menu@': {
            templateUrl: 'anon/menu.html',
            controller: 'DisplayMenuController'
          },
          'footer@': {
            templateUrl: 'anon/footer.html',
            controller: 'FooterController'
          }
        }
      })
      .state('anon.home', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'anon/home.html',
            controller: 'HomeController',
          }
        }
      })
      .state('anon.displaysubmenu', {
        url: '/displaysubmenu/:id',
        views: {
          'content@': {
            templateUrl: 'anon/displaysubmenu.html',
            controller: 'DisplaySubmenuController',
          }
        }
      })
      .state('anon.displaynews', {
        url: '/displaynews/:id',
        views: {
          'content@': {
            templateUrl: 'anon/displaynews.html',
            controller: 'DisplayNewsController',
          }
        }
      })
      .state('anon.mailform', {
        url: '/mailform',
        views: {
          'content@': {
            templateUrl: 'anon/mailform.html',
            controller: 'MailController'
          }
        }
      })
      .state('anon.displaylegalnotice', {
        url: '/displaylegalnotice',
        views: {
          'content@': {
            templateUrl: 'anon/displaylegalnotice.html',
            controller: 'DisplayLegalnoticeController'
          }
        }
      })
      .state('anon.login', {
        url: '/login',
        views: {
          'content@': {
            templateUrl: 'anon/login.html',
            controller: 'LoginController'
          }
        }
      });
    $stateProvider
      .state('user', {
        abstract: true,
        url: '/user',
        views: {
          'navbar@': {
            templateUrl: 'user/navbar.html',
            controller: 'NavbarController'
          }
        },
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.register', {
        url: '/register',
        views: {
          'content@': {
            templateUrl: 'user/register.html',
            controller: 'RegisterController'
          }
        }
      })
      .state('user.submenu', {
        url: '/submenu',
        views: {
          'content@': {
            templateUrl: 'user/submenu.html',
            controller: 'SubmenuController'
          }
        }
      })
      .state('user.create-submenu', {
        url: '/submenu',
        views: {
          'content@': {
            templateUrl: 'user/create-submenu.html',
            controller: 'CreateSubmenuController'
          }
        }
      })
      .state('user.edit-submenu', {
        url: '/submenu/:id',
        views: {
          'content@': {
            templateUrl: 'user/edit-submenu.html',
            controller: 'EditSubmenuController'
          }
        }
      })
      .state('user.news', {
        url: '/news',
        views: {
          'content@': {
            templateUrl: 'user/news.html',
            controller: 'NewsController'
          }
        }
      })
      .state('user.create-news', {
        url: '/news',
        views: {
          'content@': {
            templateUrl: 'user/create-news.html',
            controller: 'CreateNewsController'
          }
        }
      })
      .state('user.edit-news', {
        url: '/news/:id',
        views: {
          'content@': {
            templateUrl: 'user/edit-news.html',
            controller: 'EditNewsController'
          }
        }
      })
      .state('user.slideshow', {
        url: '/slideshow',
        views: {
          'content@': {
            templateUrl: 'user/slideshow.html',
            controller: 'SlideshowController'
          }
        }
      })
      .state('user.calendar', {
        url: '/evenements',
        views: {
          'content@': {
            templateUrl: 'user/calendar.html',
            controller: 'CalendarController'
          }
        }
      })
      .state('user.welcome', {
        url: '/welcome',
        views: {
          'content@': {
            templateUrl: 'user/welcome.html',
            controller: 'WelcomeController'
          }
        }
      })
      .state('user.legalnotice', {
        url: '/legalnotice',
        views: {
          'content@': {
            templateUrl: 'user/legalnotice.html',
            controller: 'LegalnoticeController'
          }
        }
      })
      .state('user.contact', {
        url: '/contact',
        views: {
          'content@': {
            templateUrl: 'user/contact.html',
            controller: 'ContactController'
          }
        }
      })
      .state('user.create-calendar', {
        url: '/evenements',
        views: {
          'content@': {
            templateUrl: 'user/create-calendar.html',
            controller: 'CreateCalendarController'
          }
        }
      })
      .state('user.edit-calendar', {
        url: '/evenements/:id',
        views: {
          'content@': {
            templateUrl: 'user/edit-calendar.html',
            controller: 'EditCalendarController'
          }
        }
      })
      .state('user.users', {
        url: '/list',
        views: {
          'content@': {
            templateUrl: 'user/users.html',
            controller: 'UsersController'
          }
        }
      })
      .state('user.edit-user', {
        url: '/users/:id',
        views: {
          'content@': {
            templateUrl: 'user/edit-user.html',
            controller: 'editUserController'
          }
        }
      })
      .state('user.profile', {
        url: '/profile',
        views: {
          'content@': {
            templateUrl: 'user/profile.html',
            controller: 'ProfileController'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
