import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// import package.json into js var
import packageJson from "./package.json" assert { type: "json" };

// rollup config exports array of config objects
export default [
    {
      // file that exports all components
      input: "src/index.ts",
      output: [
        // cjs defined by main prop of package.json
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
        },
        // esm defined by module prop of package.json 
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
      // each plugin is a function 
      plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
      ],
    },
    {
      // outdir: dist
      // declarationDir: types
      input: "dist/esm/types/index.d.ts",
      // define output of components
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      // invoke dts plugin
      plugins: [dts()],
    },
  ];