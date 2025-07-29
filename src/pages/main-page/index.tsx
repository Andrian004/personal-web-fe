import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TodoList } from "./_components/todo-list";
import nodeSvg from "@/assets/node.svg";
import reactSvg from "@/assets/react.svg";
import mongoSvg from "@/assets/mongodb.svg";
import expressSvg from "@/assets/express.svg";

export default function MainPage() {
  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-2 sm:p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 px-2 sm:px-0 pb-3">
        <Header title="About Me" />
      </section>
      <section className="font-normal">
        <p>
          Hi guys! Welcome to my website. I'm Andri and I'm a software developer
          with a deep interest in coding and technologies. Excited to leverage
          my self-learning and practical experience to contribute in software
          development projects and overcome programming challenges. I'm always
          open to discuss about project or partnerships. So you can contact me
          anytime{" "}
          <span className="text-sky-500 underline">
            ( Just kidding, please contact me only during working hours.🙏 )
          </span>
          .
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-medium">My Favorite Tech</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TodoList
            rootClass="bg-gradient-to-br from-white to-rose-100 dark:from-gray-950 dark:to-rose-950"
            img={mongoSvg}
            title="MongoDB"
            desc="You don't need a separate database to support transactions, rich search, or gen AI. The world's most popular document database."
          />
          <TodoList
            rootClass="bg-gradient-to-bl from-white to-green-100 dark:from-gray-950 dark:to-green-950"
            img={nodeSvg}
            title="Node Js"
            desc="Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, tools and scripts."
          />
          <TodoList
            rootClass="bg-gradient-to-tr from-white to-sky-200 dark:from-gray-950 dark:to-sky-950"
            img={reactSvg}
            title="React"
            desc="With React, you can be a web and a native developer. Your team can ship to many platforms without sacrificing the user experience."
          />
          <TodoList
            rootClass="bg-gradient-to-tl from-white to-amber-100 dark:from-gray-950 dark:to-amber-950"
            img={expressSvg}
            imgStyle="dark:bg-white dark:p-1 dark:rounded-sm"
            title="Express"
            desc="Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
