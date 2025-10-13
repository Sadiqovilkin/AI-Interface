import ChatUI from "../pages/ChatUI/ChatUI";
import ClientRoot from "../pages/ClientRoot";

export const ROUTES = [
  {
    path: "/",
    element: <ClientRoot />,
    children: [
      {
        index: true,
        element: <ChatUI />,
      },

      // {
      //   path: "payment/:paymentId",
      //   element: <PaymentDetail />,
      // },
    
    ],
  },
  // {
  //   path: "*",
  //   element: <Error />,
  // },
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },

];
