var app;
(function (app) {
    (function (wunderbar) {
        'use strict';

        

        

        var WunderbarController = (function () {
            function WunderbarController($scope, $http) {
                /// APP ID / OAUTHT CLIENT ID
                this.applicationId = '1ee793be-aba4-422f-a775-ddc448006fd0';
                // Account ID
                this.userId = '084257a1-a100-40a6-bd54-ec6018bc181a';
                // Device ID
                this.tempDeviceId = '77262bfa-f7ac-4bae-a6fb-c5999e3aaddd';
                // User token
                this.token = '8IBG3kct-JmrRy_cU5-IoLN708Z9_fAn';
                /// Wunderbar devices
                this.wbDevices = [];
                /// Measurements from device
                this.dataMeasurements = [];
                /// Input user email
                this.userEmail = '';
                /// Check existing of email - true/false
                this.emailCheck = '';
                // User Properties
                this.userProperties = '';
                this.userEmailExists = { exists: '' };
                // Bind angularJS $scope to local variable for use within controller
                this.Scope = $scope;

                this.wbDevices = ['Device1', 'Device2', 'Device3'];

                //this.wbDevices = this.getAllWBDevices();
                this.dataMeasurements = ['Measurement1', 'Measurement2', 'Measurement3'];
                //this.dataMeasurements = this.getAllMeasurements();
            }
            // *********************************************************************************
            // *****************  Verify email of user functions *******************************
            // *********************************************************************************
            WunderbarController.prototype.checkEmail = function (email) {
                console.log("CheckEmail function running", email);

                var relayr = RELAYR.init({
                    appId: this.applicationId,
                    redirectUri: 'http://localhost'
                });

                // Store email argument in variable, Guess that is right email
                this.userEmail = email;

                // Call function for AJAX request
                this.performRequest(email);
            };

            // Do AJAX request for email Verification
            WunderbarController.prototype.performRequest = function (email) {
                var _this = this;
                this.request = new XMLHttpRequest();
                this.request.open('GET', 'https://api.relayr.io/users/validate?email=' + email, true);
                this.request.onreadystatechange = function () {
                    return _this.OnRStateChange();
                };
                this.request.send();
            };

            // When server will respond, JS will execute only this function
            WunderbarController.prototype.OnRStateChange = function () {
                if (this.request.readyState === 4 && this.request.status == 200) {
                    console.log('Status:', this.request.status);
                    console.log('Headers:', this.request.getAllResponseHeaders());
                    console.log('Body:', this.request.responseText);
                    var tmpResponse = angular.fromJson(this.request.responseText);
                    this.setUserEmailExist(tmpResponse);
                    console.log('Email exist on Wunderbar repository: ', this.userEmailExists.exists);
                }
                this.Scope.$apply();
            };

            // Bind result of validation to userEmailExists object
            WunderbarController.prototype.setUserEmailExist = function (responseText) {
                this.userEmailExists.exists = responseText.exists;
                console.log('userEmailExists changed');

                // If user's email doesn't exist, set to empty string
                if (this.userEmailExists.exists == "false") {
                    this.userEmail = '';
                }
                //this.checkUserProperties();
            };

            // --- End of Verify email of user functions ---
            // *********************************************************************************
            // ***************  Get information of user functions ******************************
            // *********************************************************************************
            WunderbarController.prototype.checkUserProperties = function () {
                console.log("checkUserProperties function running");
                var relayr = RELAYR.init({
                    appId: this.applicationId,
                    redirectUri: 'http://localhost'
                });

                relayr.login({
                    success: function (token) {
                        this.performRequestUserProperties();
                    }
                });
            };

            WunderbarController.prototype.performRequestUserProperties = function () {
                var _this = this;
                console.log("performRequestUserProperties function running");
                this.request = new XMLHttpRequest();
                this.request.open('GET', 'https://api.relayr.io/oauth2/user-info');
                this.request.onreadystatechange = function () {
                    return _this.OnRStateChangecheckUserProperties();
                };
                this.request.send();
            };

            // When server will respond, JS will execute only this function
            WunderbarController.prototype.OnRStateChangecheckUserProperties = function () {
                console.log("OnRStateChangecheckUserProperties function running");
                if (this.request.readyState === 4 && this.request.status == 200) {
                    console.log('Status:', this.request.status);
                    console.log('Headers:', this.request.getAllResponseHeaders());
                    console.log('Body:', this.request.responseText);
                }
                this.Scope.$apply();
            };

            // *********************************************************************************
            // ***************  Get all Wunderbar devices of user ******************************
            // *********************************************************************************
            WunderbarController.prototype.getAllWBDevices = function () {
                console.log("Get Wunderbar devices function running");

                var relayr = RELAYR.init({
                    appId: this.applicationId,
                    redirectUri: 'http://localhost'
                });

                // Call function for AJAX request
                this.performRequestDevices('asasd');

                var tmpDevices = '';

                // meaning (string)
                // The type of the data collected.Possible values: temperature, acceleration, angular_speed, luminosity, color, noise_level, humidity, proximity
                var request = new XMLHttpRequest();

                request.open('GET', 'https://api.relayr.io/users/' + this.userId + '/devices'); //?meaning=meaning

                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
                        console.log('Body:', this.responseText);
                        tmpDevices = this.responseText;
                    }
                };

                request.send();

                console.log('Devices: ', tmpDevices);
            };

            // Do AJAX request for email Verification
            WunderbarController.prototype.performRequestDevices = function (userId) {
                var _this = this;
                this.request = new XMLHttpRequest();
                this.request.open('GET', 'https://api.relayr.io/users/' + this.userId + '/devices', true);
                this.request.onreadystatechange = function () {
                    return _this.OnRStateChange();
                };
                this.request.send();
            };

            // *********************************************************************************
            // ***************  Get data from device  ******************************************
            // *********************************************************************************
            WunderbarController.prototype.getAllMeasurements = function () {
                debugger;
                console.log("getAllMeasurements function runing");

                //If you have a token and your device ID, you can start listening to your device without going through the login process
                var relayr = RELAYR.init({
                    appId: this.applicationId,
                    redirectUri: 'http://localhost'
                });

                var temp;

                //Temp
                relayr.devices().getDeviceData({
                    token: this.token,
                    deviceId: this.tempDeviceId,
                    incomingData: function (data) {
                        temp = data.readings[0].value;
                        $("#temp").html((temp).toFixed(1).toString());
                    }
                });
            };
            WunderbarController.$inject = ['$scope'];
            return WunderbarController;
        })();

        angular.module('app.wunderbar').controller('app.wunderbar.WunderbarController', WunderbarController);
    })(app.wunderbar || (app.wunderbar = {}));
    var wunderbar = app.wunderbar;
})(app || (app = {}));
//# sourceMappingURL=wunderbar.controller.js.map
