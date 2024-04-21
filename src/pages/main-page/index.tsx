import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TodoList } from "./_components/todo-list";
import { CodeXml, Bed, Coffee, GraduationCap } from "lucide-react";

export default function MainPage() {
  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
        <Header title="About Me" />
      </section>
      <section className="font-normal">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quis
          tenetur recusandae molestiae possimus. Inventore expedita minima
          exercitationem molestiae blanditiis veritatis est voluptate quis eos
          rem maiores porro architecto assumenda quasi magni libero ut mollitia,
          consequuntur aut cum temporibus necessitatibus modi? Accusamus maxime
          culpa est, fugit ex mollitia pariatur adipisci?
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-medium">What I Do!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TodoList
            rootClass="bg-gradient-to-br from-white to-rose-100 dark:from-gray-950 dark:to-rose-950"
            icon={<CodeXml className="w-10 h-10 text-sky-500" />}
            title="Coding"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
          <TodoList
            rootClass="bg-gradient-to-bl from-white to-green-100 dark:from-gray-950 dark:to-green-950"
            icon={<Bed className="w-10 h-10 text-red-500" />}
            title="Sleep"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
          <TodoList
            rootClass="bg-gradient-to-tr from-white to-sky-200 dark:from-gray-950 dark:to-sky-950"
            icon={<Coffee className="w-10 h-10 text-amber-600" />}
            title="Drink Coffee"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
          <TodoList
            rootClass="bg-gradient-to-tl from-white to-amber-100 dark:from-gray-950 dark:to-amber-950"
            icon={<GraduationCap className="w-10 h-10" />}
            title="Study"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
