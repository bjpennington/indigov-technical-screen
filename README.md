# Indigov Technical Screen: Constituents Contact Service

## Running the app

1. Set node version.
   - This application includes a `.node-version` file to indicate the version number. You can use a Node version manager like [nodenv](https://github.com/nodenv/nodenv) or [nvm](https://github.com/nvm-sh/nvm) to manage your version locally.
2. Install dependencies:

    ```sh
    npm install
    ```

3. Run the application:

    ```sh
    npm run dev
    ```

    - Note that the app runs on port 3000, so you make sure that port is available, or change the port in `src/index.ts`

4. Profit 🎉

    You should see

      ```text
      app is running at 3000
      ```

      in your terminal. Visit or `curl` [localhost:3000](http://localhost:3000/) and you should see a "Hello world!" message.

Data is stored in a json file at `database/data.json`, so there's no need to perform any database setup.

## Other scripts

- `npm run format`: format the code with Prettier
- `npm run typecheck`: typecheck and compile the code
- `npm run start`: compile the code and run the compiled code from the `dist/` directory

## Routes

- GET constituents:

    ```sh
    curl http://localhost:3000/constituents
    ```

    or visit [localhost:3000/constituents](http://localhost:3000/constituents) to see a list of all constituents

- POST constituents:

    ```sh
    curl \
      http://localhost:3000/constituents \
      --request POST \
      --header "Content- Type: application/json" \
      --data @- << EOF
    {
      "email": "constituent@email.co",
      "firstName": "Lorna",
      "lastName": "Doone",
      "addressLine1": "456 Madeup Lane",
      "addressLine2": "Apt 101",
      "city": "Madeupville",
      "state": "OH",
      "zipCode": "43231"
    }
    EOF
    ```

    _(multiline data formatting recommendation courtesy of: [this blog post](https://nickjanetakis.com/blog/using-curl-with-multiline-json-data))_

  Note that only the email field is currently validated in the code.

- GET constituents/download:

    ```sh
    curl http://localhost:3000/constituents/download
    ```

    to get a CSV list of all constituents, or visit [localhost:3000/constituents/download](http://localhost:3000/constituents/download) to download a CSV file from the browser.

    You can also add a query param using the format `after=month-day-year` to only download constituent records created after a certain date:

    ```sh
    curl http://localhost:3000/constituents/download?after=10-22-24
    ```

    or via browser: [localhost:3000/constituents/download?after=10-22-24](http://localhost:3000/constituents/download?after=10-22-24).

## Some brief notes on the application

The design of this application is indebted to Erick Wendel's fullstack vanilla JavaScript course for Frontend Masters that I attended earlier this year (although the pattern also shares many similarities with the layered dependency injection structure of the  NestJS framework, which I also have experience working in).

Given the size, scope, and purpose (as an interview tool) of this project, I thought a frameworkless-approach might be faster to spin up than using a framework--I was definitely wrong about this, and I do want to call out that as it stands, the app is missing a _lot_ of authentication, validation, and security features that a framework would provide out of the box (or at least make it quicker to implement). For a real production app, I would definitely use a framework.
