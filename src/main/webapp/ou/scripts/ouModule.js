var ouModule=angular.module('ouModule',['ouControllers','ouServices','ouDirectives','ouConstants', 'ouFilters']);
ouModule
    .config(function ($routeProvider, $httpProvider, $translateProvider, $translatePartialLoaderProvider, tmhDynamicLocaleProvider,AUTH_BOOTSTRAP) {
        console.log('ou Module loading!!!');

        // include i18n files
        $translatePartialLoaderProvider.addPart('/ou/i18n/ou_');

    //place some routes here
        $routeProvider
            .when('/organizationalUnit', {
                templateUrl: 'ou/views/organizationalUnit/organizationalUnit.html',
                controller: 'organizationalUnitController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
            .when('/organizationUnit/manage', {
                templateUrl: 'ou/views/organization/manageOrganization.html',
                controller: 'OrganizationController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            }).when('/functions', {
                templateUrl: 'ou/views/function/function.html',
                controller: 'FunctionController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
    }).run(function ($rootScope) {

        $rootScope.$on("event:get-account-information", function(event, args) {
            if (args.moduleRights.function_READ_ACCESS != null) {
                $rootScope.checkIfAccountFunctionHaveRights = true;
            } else {
                $rootScope.checkIfAccountFunctionHaveRights = false;
            }

            if (args.moduleRights.organization_READ_ACCESS != null) {
                $rootScope.organizationIsEnable = true;
            } else {
                $rootScope.organizationIsEnable = false;
            }

            if (args.moduleRights.organizationalUnit_READ_ACCESS != null) {
                $rootScope.organizationalUnitIsEnable = true;
            } else {
                $rootScope.organizationalUnitIsEnable = false;
            }
        });

        $rootScope.loginExtensionTpl = "ou/views/login/organizationLogin.html"
    });