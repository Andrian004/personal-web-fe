import { CodeXml, Bed, Coffee, GraduationCap } from "lucide-react";
import { Footer } from "@/components/footer";
import { TodoList } from "./_components/todo-list";

export default function MainPage() {
  return (
    <div className="w-full bg-white/70 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex gap-x-4 border-b-2 border-sky-400 pb-3">
        <h1 className="text-2xl font-medium">About Me</h1>
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
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          unde error provident nobis vel laudantium atque vitae quos nihil
          alias!
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-medium">What I Do!</h2>
        <div className="grid grid-cols-2 gap-6">
          <TodoList
            rootClass="bg-gradient-to-br from-white to-rose-100"
            icon={<CodeXml className="w-10 h-10 text-sky-500" />}
            title="Coding"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
          <TodoList
            rootClass="bg-gradient-to-bl from-white to-green-100"
            icon={<Bed className="w-10 h-10 text-red-500" />}
            title="Sleep"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
          <TodoList
            rootClass="bg-gradient-to-tr from-white to-sky-200"
            icon={<Coffee className="w-10 h-10 text-amber-600" />}
            title="Drinking Coffee"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure aspernatur commodi perspiciatis cumque chinooooo ad!"
          />
          <TodoList
            rootClass="bg-gradient-to-tl from-white to-amber-100"
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
