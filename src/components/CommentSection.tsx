import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import {
  fetchSfsComments,
  postSfsComment,
  deleteSfsComment,
  toggleSfsCommentLike,
  type CommentItem,
} from '../api/sfsApi';
import '../assets/css/CommentSection.css';

interface CommentSectionProps {
  bpId?: string;
  type?: 'blueprint' | 'planet';
}

export default function CommentSection({ bpId = 'general', type = 'blueprint' }: CommentSectionProps) {
  const { user, isAuthenticated, login } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Reply state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);

  // Load real comments from database / API
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchSfsComments(bpId, user?.user_id)
      .then((data) => {
        if (mounted) {
          setComments(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to load comments from database:', err);
        if (mounted) {
          setComments([]);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [bpId, user?.user_id]);

  // Total comment count including replies
  const totalCount = comments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0);

  // Post top-level comment
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;

    if (!isAuthenticated || !user) {
      login(window.location.pathname + window.location.search);
      return;
    }

    setSubmitting(true);
    const authorName = user.name ? `${user.name} ${user.lastname || ''}`.trim() : 'Space Pilot';

    try {
      const created = await postSfsComment({
        bpId,
        userId: user.user_id,
        authorName,
        text: commentText.trim(),
      });

      setComments((prev) => [created, ...prev]);
      setCommentText('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Post nested reply
  const handleAddReply = async (parentCommentId: string) => {
    if (!replyText.trim() || replySubmitting) return;

    if (!isAuthenticated || !user) {
      login(window.location.pathname + window.location.search);
      return;
    }

    setReplySubmitting(true);
    const authorName = user.name ? `${user.name} ${user.lastname || ''}`.trim() : 'Space Pilot';

    try {
      const created = await postSfsComment({
        bpId,
        userId: user.user_id,
        authorName,
        text: replyText.trim(),
        parentId: parentCommentId,
      });

      setComments((prev) =>
        prev.map((c) => {
          if (c.id === parentCommentId) {
            return {
              ...c,
              replies: [...(c.replies || []), created],
            };
          }
          return c;
        })
      );

      setReplyingToId(null);
      setReplyText('');
    } catch (err) {
      console.error('Failed to post reply:', err);
    } finally {
      setReplySubmitting(false);
    }
  };

  // Toggle Like on comment or reply
  const handleToggleLike = (commentId: string) => {
    const res = toggleSfsCommentLike(commentId);

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, is_liked: res.is_liked, likes: res.likes };
        }
        if (c.replies && c.replies.length > 0) {
          const updatedReplies = c.replies.map((r) =>
            r.id === commentId ? { ...r, is_liked: res.is_liked, likes: res.likes } : r
          );
          return { ...c, replies: updatedReplies };
        }
        return c;
      })
    );
  };

  // Delete comment or reply
  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;

    await deleteSfsComment(commentId, user.user_id, bpId);

    setComments((prev) =>
      prev
        .filter((c) => c.id !== commentId)
        .map((c) => ({
          ...c,
          replies: c.replies ? c.replies.filter((r) => r.id !== commentId) : [],
        }))
    );
  };

  return (
    <section className="comment_section" aria-label="Community Comments">
      {/* Header */}
      <div className="comment_header">
        <h3>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
          </svg>
          Community Discussion
          <span className="count_badge">{totalCount}</span>
        </h3>
      </div>

      {/* Main Comment Input Box */}
      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="comment_input_box">
          <textarea
            className="comment_textarea"
            placeholder={`Share your thoughts, launch tips, or feedback about this ${type === 'planet' ? 'world' : 'blueprint'}...`}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <div className="comment_submit_row">
            <span style={{ fontSize: '12px', color: 'var(--gray-400, #99a1af)' }}>
              Posting as <b>{user?.name || 'Engineer'}</b>
            </span>
            <button
              type="submit"
              className="comment_submit_btn"
              disabled={!commentText.trim() || submitting}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment_auth_prompt">
          <p>Sign in to post comments, reply to builders, and join the discussion.</p>
          <button
            type="button"
            className="comment_auth_btn"
            onClick={() => login(window.location.pathname + window.location.search)}
          >
            Sign In to Comment
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="comment_loading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.8s linear infinite' }}>
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        /* Empty State with NO dummy comments */
        <div className="comment_empty">
          <div className="comment_empty_icon">💬</div>
          <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#ffffff' }}>No comments yet</p>
          <span style={{ fontSize: '13px' }}>Be the first to share your experience with this {type === 'planet' ? 'world' : 'blueprint'}!</span>
        </div>
      ) : (
        /* Comments List */
        <div className="comment_list">
          {comments.map((c) => {
            const isOwner = user?.user_id && c.user_id === user.user_id;
            const isReplying = replyingToId === c.id;

            return (
              <div key={c.id} className="comment_item">
                {/* Header */}
                <div className="comment_item_header">
                  <div className="comment_user_info">
                    <div className="comment_avatar">
                      {c.author ? c.author[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="comment_username_row">
                        <span className="comment_username">{c.author}</span>
                        {isOwner && <span className="comment_badge_you">You</span>}
                      </div>
                      <div className="comment_time">{c.time}</div>
                    </div>
                  </div>

                  {isOwner && (
                    <button
                      type="button"
                      className="comment_action_btn delete_btn"
                      onClick={() => handleDeleteComment(c.id)}
                      title="Delete your comment"
                    >
                      <svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>

                {/* Comment Body */}
                <div className="comment_body">{c.text}</div>

                {/* Actions: Like & Reply */}
                <div className="comment_actions">
                  <button
                    type="button"
                    className={`comment_action_btn ${c.is_liked ? 'liked' : ''}`}
                    onClick={() => handleToggleLike(c.id)}
                    title={c.is_liked ? 'Unlike' : 'Like'}
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                    <span>{c.likes > 0 ? c.likes : 'Like'}</span>
                  </button>

                  <button
                    type="button"
                    className="comment_action_btn"
                    onClick={() => {
                      if (!isAuthenticated) {
                        login(window.location.pathname + window.location.search);
                        return;
                      }
                      setReplyingToId(isReplying ? null : c.id);
                      setReplyText('');
                    }}
                  >
                    <svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.5A2.5 2.5 0 0 0 3.5 9h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L12.293 8H3.5A1.5 1.5 0 0 1 2 6.5V2a.5.5 0 0 0-.5-.5" />
                    </svg>
                    Reply
                  </button>
                </div>

                {/* Inline Reply Box */}
                {isReplying && (
                  <div className="comment_reply_box">
                    <textarea
                      className="comment_reply_textarea"
                      placeholder={`Reply to ${c.author}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      autoFocus
                    />
                    <div className="comment_reply_actions">
                      <button
                        type="button"
                        className="comment_reply_cancel_btn"
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyText('');
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="comment_reply_submit_btn"
                        disabled={!replyText.trim() || replySubmitting}
                        onClick={() => handleAddReply(c.id)}
                      >
                        {replySubmitting ? 'Replying...' : 'Send Reply'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested Replies List */}
                {c.replies && c.replies.length > 0 && (
                  <div className="comment_replies_thread">
                    {c.replies.map((reply) => {
                      const isReplyOwner = user?.user_id && reply.user_id === user.user_id;

                      return (
                        <div key={reply.id} className="comment_reply_item">
                          <div className="comment_item_header">
                            <div className="comment_user_info">
                              <div className="comment_avatar">
                                {reply.author ? reply.author[0].toUpperCase() : 'U'}
                              </div>
                              <div>
                                <div className="comment_username_row">
                                  <span className="comment_username">{reply.author}</span>
                                  {isReplyOwner && <span className="comment_badge_you">You</span>}
                                </div>
                                <div className="comment_time">{reply.time}</div>
                              </div>
                            </div>

                            {isReplyOwner && (
                              <button
                                type="button"
                                className="comment_action_btn delete_btn"
                                onClick={() => handleDeleteComment(reply.id)}
                                title="Delete your reply"
                              >
                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="comment_body">{reply.text}</div>

                          <div className="comment_actions">
                            <button
                              type="button"
                              className={`comment_action_btn ${reply.is_liked ? 'liked' : ''}`}
                              onClick={() => handleToggleLike(reply.id)}
                              title={reply.is_liked ? 'Unlike' : 'Like'}
                            >
                              <svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                              </svg>
                              <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
