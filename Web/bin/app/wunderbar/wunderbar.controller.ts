module app.wunderbar {
    'use strict';


    interface IWunderBar {
        /// Variables for:
         
        // APP ID / OAUTHT CLIENT ID
        applicationId: string; 
        // Account ID
        userId: string;
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
        applicationId = 'e94c0d7d-7778-4ac5-8640-ca13d658bb08';
        // Account ID
        userId = 'cb74d127-da0d-46e7-9cc9-54acfcce2a1b';
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
            console.log("CheckEmail fucntion runing", email);

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
        }
        // --- End of Verify email of user functions ---

        // *********************************************************************************
        // ***************  Get information of user functions ******************************
        // *********************************************************************************
        checkUserProperties(): void {
            this.request = new XMLHttpRequest();
            this.request.open('GET', 'https://api.relayr.io/oauth2/user-info');
            this.request.onreadystatechange = () => this.OnRStateChangecheckUserProperties();
            this.request.send();

        }

        // When server will respond, JS will execute only this function
        OnRStateChangecheckUserProperties() {
            if (this.request.readyState === 4 && this.request.status == 200) {
                console.log('Status:', this.request.status);
                console.log('Headers:', this.request.getAllResponseHeaders());
                console.log('Body:', this.request.responseText);
            }
            this.Scope.$apply();
        }

        getAllWBDevices(): void {
            console.log("Get Wunderbar devices function runing");

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

        getAllMeasurements(): void {
            debugger;
            var relayr = RELAYR.init({
                appId: this.applicationId
            });

            var tmpMeasurements;

            relayr.devices().getDeviceData({

                deviceId: "ee7e9562-2b95-4c93-a1d3-fdbaaea5c160",
                token: "UCFSuY4-Ej9PVvbAS5aMsUKhHjuLD1pj",
                incomingData: function (data) {

                    var request = new XMLHttpRequest();

                    request.open('GET', 'https://api.relayr.io/devices/deviceId');

                    request.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            console.log('Status:', this.status);
                            console.log('Headers:', this.getAllResponseHeaders());
                            console.log('Body:', this.responseText);
                        }

                    };

                    request.send();

                    //if (data) {
                    //    console.log("Data from sensor: ", data);
                    //    this.tmpMeasurements = data;
                    //} else {
                    //    console.log("Data is unavailable!");
                    //    this.tmpMeasurements = ["Data is unavailable!"];
                    //}
                }
            })


        }




    }

    angular
        .module('app.wunderbar')
        .controller('app.wunderbar.WunderbarController', WunderbarController);

}