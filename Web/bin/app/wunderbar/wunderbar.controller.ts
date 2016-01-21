module app.wunderbar {
    'use strict';


    interface IWunderBar {
        /// Variables for:
		 
        // APP ID / OAUTHT CLIENT ID
        applicationId: string; 
        // Account ID
        userId: string;
        // Temperature Device ID
        tempDeviceId: string;
        // User token
        token: string;
        // Wunderbar devices
        wbDevices: any[];
        // Measurements from device
        dataMeasurements: any[];
        // Input user email
        userEmail: string;
        // Check existing of email - true/false
        emailCheck: string;
        // User Properties
        userProperties: string;
		
        /// Functions: 
        // Verify email
        checkEmail: (email: string) => void;
        setUserEmailExist: (responseText: IUserEmail) => void;
        // Check User Properties
        checkUserProperties: () => void;

        //checkUserProperties: (email) => void;
        getAllMeasurements: () => void;
        getAllWBDevices: () => void;

    }

    // Email Validation Object
    interface IUserEmail {
        exists: string;
    }

    // User Properties Object
    interface iUserProperties {
        id: string;
        name: string;
        email: string;
    }

    declare var RELAYR: any;

    class WunderbarController implements IWunderBar {
        /// APP ID / OAUTHT CLIENT ID
        applicationId = '1ee793be-aba4-422f-a775-ddc448006fd0';
        // Account ID
        userId = '084257a1-a100-40a6-bd54-ec6018bc181a';
        // Device ID
        tempDeviceId = '77262bfa-f7ac-4bae-a6fb-c5999e3aaddd';
        // User token
        token = '8IBG3kct-JmrRy_cU5-IoLN708Z9_fAn';
        /// Wunderbar devices
        wbDevices = [];
        /// Measurements from device
        dataMeasurements = [];
        /// Input user email
        userEmail = '';
        /// Check existing of email - true/false
        emailCheck = '';
        // User Properties
        userProperties = '';
        userEmailExists: IUserEmail = { exists: '' };

        // Controller variable for angularJS $scope
        Scope: ng.IScope;
        // Request for AJAX requests
        request: XMLHttpRequest;

        static $inject = ['$scope'];
        constructor($scope: ng.IScope, $http: ng.IHttpService) {

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
        checkEmail(email: string): void {
            console.log("CheckEmail function running", email);

            var relayr = RELAYR.init({
                appId: this.applicationId,
                redirectUri: 'http://localhost',
            });

            // Store email argument in variable, Guess that is right email
            this.userEmail = email;

            // Call function for AJAX request
            this.performRequest(email);
        }

        // Do AJAX request for email Verification
        performRequest(email: string) {
            this.request = new XMLHttpRequest();
            this.request.open('GET', 'https://api.relayr.io/users/validate?email=' + email, true);
            this.request.onreadystatechange = () => this.OnRStateChange();
            this.request.send();
        }

        // When server will respond, JS will execute only this function
        OnRStateChange() {
            if (this.request.readyState === 4 && this.request.status == 200) {
                console.log('Status:', this.request.status);
                console.log('Headers:', this.request.getAllResponseHeaders());
                console.log('Body:', this.request.responseText);
                var tmpResponse = angular.fromJson(this.request.responseText);
                this.setUserEmailExist(tmpResponse);
                console.log('Email exist on Wunderbar repository: ', this.userEmailExists.exists);
            }
            this.Scope.$apply();
        }
        // Bind result of validation to userEmailExists object
        setUserEmailExist(responseText: IUserEmail): void {
            this.userEmailExists.exists = responseText.exists;
            console.log('userEmailExists changed');
            // If user's email doesn't exist, set to empty string
            if (this.userEmailExists.exists == "false") {
                this.userEmail = '';
            }
            //this.checkUserProperties();
        }
        // --- End of Verify email of user functions ---

        // *********************************************************************************
        // ***************  Get information of user functions ******************************
        // *********************************************************************************
        checkUserProperties(): void {
            console.log("checkUserProperties function running");
            var relayr = RELAYR.init({
                appId: this.applicationId,
                redirectUri: 'http://localhost',
            });

            relayr.login({
                success: function (token) {
                    this.performRequestUserProperties();
                }
            });
        }

        performRequestUserProperties() {
            console.log("performRequestUserProperties function running");
            this.request = new XMLHttpRequest();
            this.request.open('GET', 'https://api.relayr.io/oauth2/user-info');
            this.request.onreadystatechange = () => this.OnRStateChangecheckUserProperties();
            this.request.send();
        }
        // When server will respond, JS will execute only this function
        OnRStateChangecheckUserProperties() {
            console.log("OnRStateChangecheckUserProperties function running");
            if (this.request.readyState === 4 && this.request.status == 200) {
                console.log('Status:', this.request.status);
                console.log('Headers:', this.request.getAllResponseHeaders());
                console.log('Body:', this.request.responseText);
            }
            this.Scope.$apply();
        }

        // *********************************************************************************
        // ***************  Get all Wunderbar devices of user ******************************
        // *********************************************************************************
        getAllWBDevices(): void {
            console.log("Get Wunderbar devices function running");

            var relayr = RELAYR.init({
                appId: this.applicationId,
                redirectUri: 'http://localhost',
            });

            // Call function for AJAX request
            this.performRequestDevices('asasd');


            var tmpDevices = '';
            // meaning (string)
            // The type of the data collected.Possible values: temperature, acceleration, angular_speed, luminosity, color, noise_level, humidity, proximity

            var request = new XMLHttpRequest();

            request.open('GET', 'https://api.relayr.io/users/' + this.userId + '/devices');  //?meaning=meaning

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

        }

        // Do AJAX request for email Verification
        performRequestDevices(userId: string) {
            this.request = new XMLHttpRequest();
            this.request.open('GET', 'https://api.relayr.io/users/' + this.userId + '/devices', true);
            this.request.onreadystatechange = () => this.OnRStateChange();
            this.request.send();
        }

        // *********************************************************************************
        // ***************  Get data from device  ******************************************
        // *********************************************************************************
        getAllMeasurements(): void {
            debugger;
            console.log("getAllMeasurements function runing");

            //If you have a token and your device ID, you can start listening to your device without going through the login process
            var relayr = RELAYR.init({
                appId: this.applicationId,
                redirectUri: 'http://localhost',
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
        }
    }

    angular
        .module('app.wunderbar')
        .controller('app.wunderbar.WunderbarController', WunderbarController);

}