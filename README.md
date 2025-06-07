# Web Sockets based dashboard

## Project features

- **Cached states**, only the cached state is served to web-socket clients
- **Individual refresh rate for each API**, API polled individually and don't interfere each other
- **Handling race condition**, old requests doesn't overright the new one
- **Optimal re-renders**, no wasteful renders for the components that doesn't change
- **Some visual UI**, very linmited but essential dashboard

### Spent time

12 hours

### The most challenging moment

Unfortunately there was very short notice given to find time for the bonus part. Hovewere the most challening appears to host the backend as a Firebase App and not as a function. I will update the description with the link as soon as I'll make it work.

**Video demonstarion**
[![Web Sockets](https://github.com/user-attachments/assets/ea1b5777-0632-4f3d-8650-02653c9dec4f)](https://youtu.be/R5Vl5zXtzrc 'Web Sockets')

## How to Run the Project

1. Clone the repo: `https://github.com/kanatov/web-sockets.git`
2. `cd web-sockets`
3. Run `npm i` to install dependencies
4. Use `npm run` to list all available commands

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run build` | Builds the production version of client and server |
| `npm start`     | Runs the project build in production mode          |
| `npm run dev`   | Runs dev mode                                      |

## Thank you!
