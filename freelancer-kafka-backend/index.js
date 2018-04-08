var connection =  new require('./kafka/Connection');
var users = require('./services/users');
var projects = require('./services/projects');
var profiles = require('./services/profiles');
var mongoose = require('mongoose');


var topic_name = 'login_topic';

var loginConsumer = new connection().getConsumer(topic_name);
var signupConsumer = new connection().getConsumer('create_user_topic');
var createProjectConsumer = new connection().getConsumer('create_project_topic');
var retrieveProject = new connection().getConsumer('retrieve_project');
var retrieveOpenProjects = new connection().getConsumer('retrieve_all_open_projects');
var retrieveBiddedProjects = new connection().getConsumer('retrieve_all_bidded_projects');
var retrieveCreatedProjects = new connection().getConsumer('retrieve_all_created_projects');
var projectBid = new connection().getConsumer('project_bid');
var retrieveProfile = new connection().getConsumer('retrieve_profile');
var updateProfile = new connection().getConsumer('update_profile');
var projectHire = new connection().getConsumer('project_hire');
var retrieveRelevantProjects = new connection().getConsumer('retrieve_all_relevant_projects');
var producer = new connection().getProducer();

mongoose.connect('mongodb://freelancer273:freelancer273@ds135619.mlab.com:35619/freelancer-lab2');


console.log('server is running');
loginConsumer.on('message', function (message) {
    console.log('login message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    users.validateUser(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log(err);
        });
        return;
    });
});

signupConsumer.on('message', function (message) {
    console.log('signup message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    users.create(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

createProjectConsumer.on('message', function (message) {
    console.log('create project message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.create(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


retrieveProject.on('message', function (message) {
    console.log('retrieve project message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.retrieve(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

retrieveProject.on('message', function (message) {
    console.log('retrieve project message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.retrieve(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

retrieveOpenProjects.on('message', function (message) {
    console.log('retrieve open projects message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.retrieveAllOpen(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

retrieveBiddedProjects.on('message', function (message) {
    console.log('retrieve bidded projects message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.retrieveAllBidded(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

retrieveCreatedProjects.on('message', function (message) {
    console.log('retrieve created projects message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.retrieveAllCreated(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

projectBid.on('message', function (message) {
    console.log('bid projects message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.bid(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


retrieveProfile.on('message', function (message) {
    console.log('retrieve profile message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    profiles.retrieve(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

updateProfile.on('message', function (message) {
    console.log('retrieve profile message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    profiles.update(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

retrieveRelevantProjects.on('message', function (message) {
    console.log('retrieve relevant projects received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.retrieveAllRelevant(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

projectHire.on('message', function (message) {
    console.log('hire message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    projects.hire(data.data, function(err,res){
        console.log('after handle');
        console.log(res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});