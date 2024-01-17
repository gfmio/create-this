# create-this 🚀

This project is a convenience wrapper for invoking starter kits from sources
other than public packages named `create-<X>`.

It is most useful for conveniently invoking starter kits in private
repositories, from scoped packages, private packages or private registries.

```sh
# With npm
npx create-this git+ssh://git@github.com/user/repo.git
npx create-this my-private-package
npx create-this @myorg/some-package
npx create-this ./path/to/my/package

# With yarn
yarn create this git+ssh://git@github.com/user/repo.git
yarn create this my-private-package
yarn create this @myorg/some-package
yarn create this ./path/to/my/package

# With pnpm
pnpm create this git+ssh://git@github.com/user/repo.git
pnpm create this my-private-package
pnpm create this @myorg/some-package
pnpm create this ./path/to/my/package
```

## Usage

```sh
# With NPM
npx create-this <options for create-this> <package-identifier> <options-and-arguments-for-the-invoked-starter-kit>

# With Yarn
yarn create this <options for create-this> <package-identifier> <options-and-arguments-for-the-invoked-starter-kit>

# With pnpm
pnpm create this <options for create-this> <package-identifier> <options-and-arguments-for-the-invoked-starter-kit>
# or
pnpx create-this <options for create-this> <package-identifier> <options-and-arguments-for-the-invoked-starter-kit>
```

`create-this` will try to automatically infer which package manager you're using. If this fails or if you want to use
another package manager, then you can specify it using `--use (npm|yarn|pnpm)`.

Any options and arguments passed to `create-this` after the package identifier are passed to the invoked starter kit.

This tool is most convenient for invoking unpublished starter kits in private (or public) git repositories, e.g

```sh
yarn create this git+ssh://git@github.com/user/repo.git -a -b --some-option --another-option 42 ./some-dir
```

You can also use it to invoke private packages or scoped packages

```sh
yarn create this my-private-package -a -b --some-option --another-option 42 ./some-dir

yarn create this @myorg/some-package -a -b --some-option --another-option 42 ./some-dir
```

Finally, you can also use a local directory as the source.

```sh
yarn create this ./path/to/my/package -a -b --some-option --another-option 42 ./some-dir
```

## License

[MIT](./LICENSE)
