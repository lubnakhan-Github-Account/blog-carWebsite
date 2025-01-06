

"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';

interface Comment {
  id: string;
  author: string;
  text: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch comments for the given postId
    // Example: fetchComments(postId).then(setComments);
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim()) {
      alert('Please fill out both fields before submitting.');
      return;
    }

    const newCommentObj: Comment = {
      id: new Date().toISOString(),
      author: authorName,
      text: newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
    setAuthorName('');
  };

  const handleEditComment = (commentID: string) => {
    const commentToEdit = comments.find((comment) => comment.id === commentID);
    if (commentToEdit) {
      setNewComment(commentToEdit.text);
      setAuthorName(commentToEdit.author);
      setEditingCommentId(commentID);
    }
  };

  const handleSaveEditedComment = () => {
    if (!newComment.trim() || !authorName.trim() || !editingCommentId) {
      alert('Please fill out both fields before saving.');
      return;
    }

    const updatedComments = comments.map((comment) =>
      comment.id === editingCommentId
        ? { ...comment, text: newComment, author: authorName }
        : comment
    );

    setComments(updatedComments);
    setNewComment('');
    setAuthorName('');
    setEditingCommentId(null);
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Section Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Comments</h2>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="border border-gray-200 rounded-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">
                      {comment.author}
                    </h4>
                    <p className="text-sm text-gray-500">Posted just now</p>
                  </div>
                  <Button
                    onClick={() => handleEditComment(comment.id)}
                    className="text-sm text-sky-500 hover:text-blue-600"
                  >
                    Edit
                  </Button>
                </div>
                <p className="mt-2 text-gray-800">{comment.text}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-400">No comments yet.</p>
        )}
      </div>

      {/* Add/Edit Comment Form */}
      <div className="mt-8">
        <Input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2"
        />
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2"
        />
        <Button
          onClick={
            editingCommentId ? handleSaveEditedComment : handleAddComment
          }
          className="w-full py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-800 transition duration-300"
        >
          {editingCommentId ? 'Save Changes' : 'Submit Comment'}
        </Button>
      </div>
    </div>
  );
}