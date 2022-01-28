const Discord = require("discord.js");
const manager = new Discord.WebhookClient(
    '925220757200592986',
    'DD_ig5JClqqgwABZBaV_9MnMi3NZcZ3Pmu61Ovm7lFjJw8v3UnZbw_SDowLBvLMN3kH8'
);
const manager2 = new Discord.WebhookClient(
    '925220757200592986',
    'DD_ig5JClqqgwABZBaV_9MnMi3NZcZ3Pmu61Ovm7lFjJw8v3UnZbw_SDowLBvLMN3kH8'
);
let serv = new Discord.MessageEmbed();
const got = require('got');


module.exports.run = async function(Redis) {

    console.log(
        `[AstroUptime] (Ping Service) Submitting a ping...`
    )

    Redis.keys(`user-*`, async function (err, obj) {
        if(err) {
            serv.setColor('RED')
            serv.setDescription('Database error')
            manager.send({
                username: `${process.env.LOCATION} Service`,
                embeds: [serv]
            });
        }

        if(obj) {
            let res =
                await obj.filter((element) => {
                    if(!element.includes('-monitor-')) {
                        return element
                    }
                })

            res.map(email => {
                Redis.get(`${email}`, function (err, res) {
                    if(err) {
                        serv.setColor('RED')
                        serv.setDescription('Database error')
                        manager.send({
                            username: `${process.env.LOCATION} Service`,
                            embeds: [serv]
                        });
                    }

                    if(res) {
                        res = JSON.parse(res);

                        if(res.monitors) {
                            let mon = res.monitors;
                            mon.map(monitor => {
                                let string = `${email}-monitor-${monitor.name}`;
                                //console.log(string)

                                Redis.get(`${string}`, async function (err,res2) {
                                    if(err) {
                                        serv.setColor('RED')
                                        serv.setDescription('Database error')
                                        return manager.send({
                                            username: `${process.env.LOCATION} Service`,
                                            embeds: [serv]
                                        });
                                    }

                                    if(res2) {
                                        res2 = JSON.parse(res2)

                                        //console.log(res2);

                                        let cooldown = 300000;

                                        if (res2.data) {
                                            let d = await res2.data.filter((data) => {
                                                if (data.location.includes(`${process.env.LOCATION}`)) {
                                                    return data
                                                }
                                            })

                                            let last = d[d.length - 1];

                                            if (last) {
                                                if (Date.now() - parseInt(last.checkedAt) < cooldown) {
                                                    return;
                                                }
                                            }
                                        }

                                        if(res2.suspended) return; // do not run.

                                        // check monitor here
                                        if (res2.url) {

                                            try {
                                                const response = await got(`${res2.url}`);
                                                //console.log(response);

                                                if(response.statusCode === 200) {
                                                    //console.log('online')
                                                    res2.up = true;
                                                    let data = res2.data || [];
                                                    let r = {
                                                        statusCode: response.statusCode,
                                                        checkedAt: Date.now(),
                                                        location: `${process.env.LOCATION}`
                                                    }
                                                    data.push(r);

                                                    res2.karma = null
                                                    res2.suspended = false;

                                                    res2.data = data
                                                    res2.lastCheck = Date.now();

                                                    Redis.set(`${string}`, JSON.stringify(res2));

                                                } else {
                                                    console.log(response.statusCode)
                                                }

                                            } catch (e) {
                                                // error with request
                                                /*console.log(e)
                                                console.log(e.code)*/

                                                let karma = res2.karma || 0;
                                                res2.karma = karma + 1;

                                                if(e.code === "ENOTFOUND") {
                                                    res2.up = false;
                                                    let data = res2.data || [];
                                                    let r = {
                                                        statusCode: '404',
                                                        checkedAt: Date.now(),
                                                        location: `${process.env.LOCATION}`
                                                    }
                                                    data.push(r);
                                                    res2.suspended = false;

                                                    res2.data = data
                                                    res2.lastCheck = Date.now();

                                                    Redis.set(`${string}`, JSON.stringify(res2));

                                                } else if(karma === 3) {
                                                    res2.suspended = true;
                                                    Redis.set(`${string}`, JSON.stringify(res2));

                                                    serv.setColor('GREY')
                                                    serv.setTitle('Monitor Suspended')
                                                    serv.setDescription(`${e} \n Check [admin panel](https://astrouptime.com/login?redirect=admin) for more instructions.`)
                                                    return manager2.send({
                                                        username: `${process.env.LOCATION} Service`,
                                                        embeds: [serv]
                                                    });
                                                } else {
                                                    Redis.set(`${string}`, JSON.stringify(res2));

                                                    console.log(e)
                                                    serv.setColor('RED')
                                                    serv.setTitle('Request Error')
                                                    serv.setDescription(`${e} \n Check [admin panel](https://astrouptime.com/login?redirect=admin) for more instructions.`)
                                                    return manager2.send({
                                                        username: `${process.env.LOCATION} Service`,
                                                        embeds: [serv]
                                                    });
                                                }
                                            }

                                        } else {
                                            //  console.log('could not find anything')
                                            /// ip?
                                        }

                                    }
                                })

                            })
                        }
                    }

                })
            })

        }
    })
};

exports.conf = {
    time: "* * * * *", //cron time stamp
    name: "ping",
    log: false,
    firstRun: true
};