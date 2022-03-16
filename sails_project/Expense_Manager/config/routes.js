/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //public routes
  'POST /register': {
    action: 'User/createAccount'
  },
  'POST /login': {
    action: 'User/login'
  },
  'GET /logout/:userId': {
    action: 'User/logout'
  },
  'GET /getAccounts': {
    action: 'User/getAccounts'
  },
  'POST /Account/addAccount': {
    action: 'User/addAccount'
  },
  'PATCH /editAccountName/:accountId': {
    action: 'User/editAccountName'
  },
  'DELETE /deleteAccountName/:accountId': {
    action: 'User/deleteAccountName'
  },
  'POST /addMember': {
    action: 'User/addMember'
  },
  'POST /addTransaction': {
    action: 'User/addTransaction'
  },
  'POST /getAllTransaction': {
    action: 'User/getAllTransaction'
  }




};
