import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 10
;

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "Devi essere loggato per creare un gioco." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "Sei un AI utile che può generare una coppia di domanda e risposta, la lunghezza di ogni risposta non deve superare le 15 parole, memorizza tutte le coppie di risposte e domande in un array JSON",
        new Array(amount).fill(
          `Devi generare una domanda aperta difficile casuale su ${topic}`
        ),
        {
          question: "domanda",
          answer: "risposta con massimo 15 parole",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "Sei un AI utile che può generare domande e risposte a scelta multipla, la lunghezza di ogni risposta non deve superare le 15 parole, memorizza tutte le risposte, domande e opzioni in un array JSON",
        new Array(amount).fill(
          `Devi generare una domanda a scelta multipla difficile casuale su ${topic}`
        ),
        {
          question: "domanda",
          answer: "risposta con massimo 15 parole",
          option1: "opzione1 con massimo 15 parole",
          option2: "opzione2 con massimo 15 parole",
          option3: "opzione3 con massimo 15 parole",
        }
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("errore elle gpt", error);
      return NextResponse.json(
        { error: "Si è verificato un errore imprevisto." },
        {
          status: 500,
        }
      );
    }
  }
}
