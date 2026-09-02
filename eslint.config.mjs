import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "storage/**", "public/**"],
  },
];

export default eslintConfig;
