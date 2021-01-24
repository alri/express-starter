module.exports = {
    "env": {
        "browser": true,
        "node":true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        'airbnb-base',
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "brace-style": [
            "error",
            "stroustrup"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-var": [
            "off"
        ],
        "one-var": [
            "off"
        ]
    }
};
