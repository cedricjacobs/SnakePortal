import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { scores, detailedscores,blogposts,feedentries } from './fake-backend-data'

/**
 * Based on:  * http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial for user transactions 
 * Added more scenarios to enable full mocking
 */

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: function (backend: MockBackend, options: BaseRequestOptions) {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                console.log(connection.request.url);
                console.log(connection.request.method);
                // authenticate
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return 200 OK with user details and fake jwt token
                        let user = filteredUsers[0];
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
                            }
                        })));
                    } else {
                        // else return 400 bad request
                        connection.mockError(new Error('Username or password is incorrect'));
                    }
                }

                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // create user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                    }

                    // save new user
                    newUser.id = users.length + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }
                //get scores
                if (connection.request.url.endsWith('/api/portaluserwithscores?detailscores=false') && connection.request.method === RequestMethod.Get) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: scores })));
                }
                //get detailed score by id
                if (connection.request.url.match(/http:\/\/snakeportal\.azurewebsites\.net\/api\/portaluserwithscores\/\d/) && connection.request.method === RequestMethod.Get) {
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedscores = detailedscores.filter(user=>{return user.Id==id;});
                    let matched = matchedscores.length ? matchedscores[0] : null;
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matched })));
                }
                //get blogposts
                 if (connection.request.url.endsWith('/api/blogposts') && connection.request.method === RequestMethod.Get) {
                       connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: blogposts }))); 
                 }
                //get blogpost by id
                if (connection.request.url.match(/http:\/\/snakeportal\.azurewebsites\.net\/api\/blogposts\/\d/) && connection.request.method === RequestMethod.Get) {
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedPosts = blogposts.filter(post=>{return post.Id==id;});
                    let matched = matchedPosts.length ? matchedPosts[0] : null;
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matched })));
                }
                                //get feedentries
                 if (connection.request.url.endsWith('/api/feedentries') && connection.request.method === RequestMethod.Get) {
                       connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: feedentries }))); 
                 }
                //get feedentry by id
                if (connection.request.url.match(/http:\/\/snakeportal\.azurewebsites\.net\/api\/feedentries\/\d/) && connection.request.method === RequestMethod.Get) {
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedPosts = feedentries.filter(post=>{return post.Id==id;});
                    console.log('backend: ');
                    console.log(JSON.stringify(matchedPosts));
                    let matched = matchedPosts.length ? matchedPosts[0] : null;
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matched })));
                }


            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};