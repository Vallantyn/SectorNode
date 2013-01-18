'use strict';

exports.Create = function (name)
{
    function User()
    {
        this.name = name;
        this.xp = 0;
        this.level = 0;
    };

    return new User();
};