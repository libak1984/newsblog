(function () {
    var app = angular.module('App', []);
    var baseUrl = 'http://localhost:5000/api';

    app.controller('appCtrl', function ($scope, $http) {

        $scope.isLoggedIn = false;

        let blogUser = window.localStorage.getItem('blogUser');
        if (blogUser != null) {
            $scope.isLoggedIn = true;
        }

        listBlogApiCall({ status: 'publish' });

        $scope.logout = function () {
            window.localStorage.removeItem('blogUser');
            $scope.isLoggedIn = false;
            window.location.reload();
        };

        $scope.showLogin = function () {
            $scope.showLoginModal = true;
        };

        $scope.closeLoginModal = function () {
            $scope.showLoginModal = false;
        };

        $scope.showSignUp = function () {
            $scope.showSignUpModal = true;
        };

        $scope.closeSignUpModal = function () {
            $scope.showSignUpModal = false;
        };


        $scope.login = function () {
            let loginData = {
                emailaddress: $scope.emailaddress,
                password: $scope.password
            }

            $http.post(`${baseUrl}/user/validate`, loginData).then(function (response) {
                if (response.data.statuscode === 200) {
                    window.localStorage.setItem('blogUser', response.data.data.payload.data.firstname);
                    window.localStorage.setItem('blogEmail', response.data.data.payload.data.emailaddress);
                    window.location.reload();
                } else {
                    $scope.messageClass = '_error';
                    $scope.message = response.data.error.message;
                }
            });
        };

        $scope.signUp = function () {

            let userData = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                emailaddress: $scope.emailaddress,
                password: $scope.password
            }

            $http.post(`${baseUrl}/profile/create`, userData).then(function (response) {
                if (response.data.statuscode === 200) {
                    $scope.firstname = '';
                    $scope.lastname = '';
                    $scope.emailaddress = '';
                    $scope.password = '';
                    $scope.messageClass = '_success';
                    $scope.message = 'Your profile has been created successfully';
                } else {
                    $scope.messageClass = '_error';
                    $scope.message = response.data.error.message;
                }
            });
        };


        $scope.publishBlock = function () {
            $scope.isPublishBlock = true;
        };

        $scope.publish = function () {

            $scope.showProgressBar = true;

            let blogData = {
                title: $scope.pTitle,
                category: $scope.category,
                content: $scope.pContent,
                posted_by: window.localStorage.getItem('blogEmail')
            }


            $http.post(`${baseUrl}/blog/create`, blogData).then(function (response) {

                if (response.data.statuscode === 200) {
                    window.location.reload();
                } else {
                    $scope.messageClass = '_error';
                    $scope.message = response.data.error.message;
                }
                $scope.showProgressBar = false;
            });
        };

        $scope.listBlog = function () {
            listBlogApiCall({ status: 'publish' });
        };

        $scope.listBlogByCategory = function (category) {
            if (category === 'All') {
                listBlogApiCall({});
            } else {
                listBlogApiCall({ category: category });
            }
        };

        $scope.searchBlog = function () {

            let searchParam = {
                searchTerm: $scope.searchTerm
            }

            $http.post(`${baseUrl}/blog/search`, searchParam).then(function (response) {
                
                $scope.searchTerm = '';

                if (response.data.statuscode === 200 && response.data.data.payload.data.length >0) {
                    $scope.blogs = [];
                    response.data.data.payload.data.forEach(element => {
                        $scope.blogs.push(element._source)
                    });
                  
                    $scope.isBlogsAvailable = true;
                } else {
                    $scope.isBlogsAvailable = false;
                    $scope.blogs = [];
                }

            });
        };

        function listBlogApiCall(inputParam) {
            $http.post(`${baseUrl}/blog/list`, inputParam).then(function (response) {
                if (response.data.statuscode === 200) {
                    $scope.blogs = response.data.data.payload.data;
                    $scope.isBlogsAvailable = true;
                } else {
                    $scope.isBlogsAvailable = false;
                    $scope.blogs = [];
                }

            });
        }
    });
})()

