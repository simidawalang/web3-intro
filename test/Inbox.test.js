// contract test code will go here
const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts, inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      arguments: ["Hi, there"],
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox: ", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("as a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi, there");
  });

  it('can modify a message', async () => {
    await inbox.methods.setMessage('bye').send({from: accounts[0]})
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
