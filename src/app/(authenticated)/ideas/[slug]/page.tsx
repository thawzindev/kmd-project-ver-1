"use client";

import { useFetchComments } from "@/app/hooks/queries/useFetchComments";
import { useFetchIdeaDetails } from "@/app/hooks/queries/useFetchIdeaDetails";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createComment, postCommentReaction, postReaction } from "@/routes/api";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { DownloadIcon, MessageCircleIcon, MoreHorizontalIcon, ThumbsDownIcon, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Comment from "@/components/Comment";
import Cookies from 'js-cookie'

const Page = () => {
  const queryClient = useQueryClient();

  const { slug } = useParams();
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  const { data, isFetching, error, isLoading } = useFetchIdeaDetails(slug.toString());
  const { data: comments } = useFetchComments(30, 1, slug.toString());

  const idea = data?.results;

  const userCookie = Cookies.get('user');

  const user = userCookie ? JSON.parse(userCookie) : null;

  const canDeleteComment = user?.role === 'Admin';


  const commentMutation = useMutation({
    mutationFn: (payload: any) => {
      return createComment(idea.slug, payload);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Successfully commented on this post!", { duration: 2000 });
      // router.push('/ideas')
    },
    onError: (error) => {
      toast.error(error.message, { duration: 2000 });
      console.log("error", error.message);
    },
    onSettled: () => {
      setComment("");
      setIsCommenting(false);
    },
  });

  const reactionMutation = useMutation({
    mutationFn: (reaction: string) => {
      return postReaction(reaction, idea.slug);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
      toast.success("Successfully reacted!", { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 2000 });
      console.log("error", error.message);
    },
    onSettled: () => { },
  });

  const commentReactionMutation = useMutation({
    mutationFn: ({ commentId, ideaSlug, reaction }) => {
      return postCommentReaction(reaction, ideaSlug, commentId);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Successfully reacted!", { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 2000 });
      console.log("error", error.message);
    },
    onSettled: () => { },
  });

  const postComment = () => {
    setIsCommenting(true);
    const payload = {
      content: comment,
      is_anonymous: anonymous,
    };
    commentMutation.mutate(payload);
  };

  const createReaction = (type: string) => {
    if (idea?.currentReaction === "THUMBS_UP" && type === "THUMBS_DOWN") {
      toast.error("you have already thumb up. Please remove current reaction to thumb down.");
      return;
    } else if (idea?.currentReaction === "THUMBS_DOWN" && type === "THUMBS_UP") {
      toast.error("you have already thumb down. Please remove current reaction to thumb up.");
      return;
    }
    reactionMutation.mutate(type);
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-white rounded-sm mx-auto border border-gray-600">
        <div className="p-6">
          {idea && idea ? (
            <>

              <div className="flex items-center space-x-4 mt-4">
                <Image
                  className="aspect-square"
                  alt="Sarrah"
                  src={idea?.staff?.avatar ? idea?.staff?.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s"}
                  width={30}
                  height={30}
                />
                <div>
                  <div className="font-semibold">{idea.staff?.name || "Anonymous"}</div>
                  <div className="text-xs text-gray-500">{idea.submittedAt}</div>
                </div>
              </div>

              <div className="flex justify-between items-start mt-2">
                <h2 className="text-2xl font-bold">{idea.title}</h2>
              </div>

              <p className="mt-4 text-gray-700">{idea.content}</p>
              <small className="px-2 bg-blue-200 rounded text-gray-700 mt-4">
                {idea.category?.name}
              </small>
              <div className="flex items-center space-x-2 mt-4">
                <ThumbsUpIcon className={cn(idea?.currentReaction === "THUMBS_UP" ? "fill-emerald-600" : "", "cursor-pointer")} onClick={() => createReaction("THUMBS_UP")} />
                <span className="text-gray-700">{idea.reactionsCount.THUMBS_UP?.toString()}</span>
                <ThumbsDownIcon className={cn(idea?.currentReaction === "THUMBS_DOWN" ? "fill-red-400" : "", "cursor-pointer")} onClick={() => createReaction("THUMBS_DOWN")} />
                <span className="text-gray-700">{idea.reactionsCount.THUMBS_DOWN?.toString()}</span>
                {/* <MessageCircleIcon className="text-gray-400" />
                                <span className="text-gray-700">{idea.commentsCount?.toString()}</span> */}
                {/* <ShareIcon className="text-gray-400" />
                            <span className="text-gray-700">2k</span> */}
              </div>
              {idea.file && (
                <div className="inline-flex items-center px-2 py-1 space-x-2 bg-gray-100 rounded-lg mt-5">
                  {idea.file && !['jpg', 'jpeg', 'png'].includes(idea.file.type.toString()) ? (
                    <div className="inline-flex items-center px-2 py-1 space-x-2">
                      <span className="font-medium text-gray-700">{idea.file.url.split('/').pop()?.replace(/\.[^/.]+$/, '')}.{idea.file.type.toString()}</span>
                      <DownloadIcon className="text-gray-700 cursor-pointer"
                        onClick={() => {
                          window.open(idea.file.url, '_blank')
                        }}
                      />
                    </div>
                  ) : (
                    <Image className="aspect-square" alt="Sarrah" src={idea.file.url} width={240} height={200} />
                  )}

                </div>
              )}
            </>
          ) : (
            <>
              {isFetching && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <div className="py-12 px-4 text-lg font-medium text-center text-gray-900">Loading...</div>
                </div>
              )}
            </>
          )}
        </div>

        <hr className="h-0.5 my-4 bg-gray-400 border-0 dark:bg-gray-400" />

        <div className="w-full mx-auto px-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <div className="space-y-6">
            {comments?.results &&
              comments?.results.map((comment: any) => {
                return <Comment comment={comment} canDelete={canDeleteComment} idea={idea} key={comment.id} />
              })}
          </div>

          <div className="mt-6">
            <textarea
              rows={4}
              className="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type something..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex justify-end mt-2 space-x-2">
              {/* <Button variant="outline">Cancel</Button> */}

              <div className="flex items-center space-x-2">
                {
                  <Switch
                    onCheckedChange={(newValue: any) => {
                      setAnonymous(newValue);
                    }}
                  />
                }
                <Label htmlFor="is_anonymous">Post anonymously</Label>
              </div>

              <Button disabled={comment.length === 0 || isCommenting} onClick={() => postComment()}>
                {isCommenting ? "Commenting" : "Comment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
