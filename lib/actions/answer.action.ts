"use server";

import Answer from "@/database/answer.model";
import {
  CreateAnswerParams,
  GetAnswersParams,
} from "@/lib/actions/shared.types";
import Question from "@/database/question.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    await connectToDatabase();

    const { author, content, question, path } = params;

    const answer = await Answer.create({ author, content, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log("[CREATE_ANSWER_ERROR]", error);
    throw new Error("Failed to create answer");
  }
};

export const getAllQuestionAnswers = async (params: GetAnswersParams) => {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log("[GET_ALL_QUESTION_ANSWERS_ERROR]", error);
    throw new Error("Failed to get all question answers");
  }
};
