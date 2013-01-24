/*global define:true*/

'use strict';

define('Asset.Scene/LobbyMain',

['Scene', 'GameObject', 'Network', 'Screen', 'UI', 'Vector2'],

function (Scene, GameObject, socket, Screen, UI, Vector2)
{
    return function ()
    {
        var scene = new Scene(),
            users,
            partys = {},
            partySocket,
            click = false,

            connectedUsers = new GameObject(),
            connectedUsersUI = {
                active: true,
                UI: function ()
                {
                    UI.Label('- Connected Users -', connectedUsers.transform.position);
                }
            },

            menu = new GameObject(),
            menuUI = {
                active: true,
                UI: function ()
                {
                    if (UI.Label('Create Party', menu.transform.position, { hover: true, click: true }))
                    {
                        if (!click)
                        {
                            socket.emit('create party', 'toto', function (partyId)
                            {
                                menuUI.active = false;
                                teamUI.active = true;
                            });

                            click = true;
                        }
                    }
                    else
                    {
                        click = false;
                    }
                }
            },
            teamUI = {
                active: false,
                UI: function ()
                {
                    UI.Label('- Your Party -', menu.transform.position)
                }
            };

        socket.on('new party', function (user)
        {
            partys[user._id] = user;
            console.log(user);
        })

        var click = false;
        var party = new GameObject(),
        partyUI = {
            active: true,
            UI: function ()
            {
                var partyArray = Object.keys(partys);
                for (var i = 0; i < partyArray.length; i++)
                {
                    var user = partys[partyArray[i]];
                    if (UI.Label(user.name + '\'s Party', party.transform.position.Add(new Vector2(0, 20 * i)), { click: true, hover: true }))
                    {
                        if (!click)
                        {
                            socket.emit('join party', user._id, function (check)
                            {
                                if (check)
                                {
                                    menuUI.active = false;
                                }
                                else console.warn(user.name + ' has not started a party.');
                            });

                            click = true;
                        }
                    }
                    else
                    {
                        click = false;
                    }
                }
            }
        };

        party.transform.Translate(new Vector2(Screen.bounds.width - 100, 100));

        party.AddComponent(partyUI);
        scene.AddObject(party);

        connectedUsers.transform.Translate(new Vector2(100, 20));
        menu.transform.Translate(new Vector2(Screen.bounds.width - 100, 80));

        connectedUsers.AddComponent(connectedUsersUI);
        menu.AddComponent(menuUI);
        menu.AddComponent(teamUI);

        scene.AddObject(connectedUsers);
        scene.AddObject(menu);

        return scene;
    };
});