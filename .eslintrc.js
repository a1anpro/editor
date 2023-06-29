module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
    "@vue/eslint-config-prettier"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021
  },
  rules: {
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,//单引号
        tabWidth: 2,// tab对应几个空格
        indent: 2,//缩进2个空格
        semi: false,//行末要不要加分号
        trailingComma: "none",//对象最后一个属性后面是否要逗号
        endOfLine: "auto",//行尾的换行符
      }
    ],
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  },
  globals: {
    defineProps: "readonly"
  }
}