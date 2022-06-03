import { rest } from 'msw';
export const handlers = [
  rest.get("https://3030-pelousous-basicjestrtl-qb8chneooxi.ws-eu46.gitpod.io/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' }
      ])
    )
  }),
  rest.get("https://3030-pelousous-basicjestrtl-qb8chneooxi.ws-eu46.gitpod.io/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' }
      ])
    )
  })
]