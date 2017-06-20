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
            .state('anon.submenu', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'anon/submenu.html',
                        controller: 'EditSubmenuController',
                    }
              }
            })
            .state('anon.formulaire', {
                url: '/formulaire',
                views: {
                    'content@': {
                        templateUrl: 'anon/formulaire.html',
                        controller: 'MailController'
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
            .state('user.dashboard', {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'user/dashboard.html',
                        controller: 'DashboardController'
                    }
                }
            })
            .state('user.admin', {
                url: '/admin',
                views: {
                    'content@': {
                        templateUrl: 'user/admin.html',
                        controller: 'AdminController'
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
                        controller: 'SubmenuController'
                    }
                }
            })
            .state('user.edit-submenu', {
                url: '/submenu/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/edit-submenu.html',
                        controller: 'SubmenuController'
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
                        controller: 'NewsController'
                    }
                }
            })
            .state('user.edit-news', {
                url: '/news/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/edit-news.html',
                        controller: 'NewsController'
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
            .state('user.create-calendar', {
                url: '/evenements',
                views: {
                    'content@': {
                        templateUrl: 'user/create-calendar.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('user.edit-calendar', {
                url: '/evenements/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/edit-calendar.html',
                        controller: 'CalendarController'
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
            $stateProvider
                .state('admin', {
                    abstract: true,
                    url: '/admin',
                    views: {
                        'navbar@': {
                            templateUrl: 'admin/navbar.html',
                            controller: 'NavbarController'
                        }
                    },
                    data: {
                        access: AccessLevels.admin
                    }
                })
                .state('admin.register', {
                    url: '/register',
                    views: {
                        'content@': {
                            templateUrl: 'admin/register.html',
                            controller: 'RegisterController'
                        }
                    }
                });
        $urlRouterProvider.otherwise('/');
      });
