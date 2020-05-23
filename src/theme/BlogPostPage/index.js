/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import BlogPostPaginator from "@theme/BlogPostPaginator";
import _ from "./isso.scss";

function BlogPostPage(props) {
    const { content: BlogPostContents } = props;
    const { frontMatter, metadata } = BlogPostContents;
    return (
        <Layout title={metadata.title} description={metadata.description}>
            {BlogPostContents && (
                <div className="container margin-vert--xl">
                    <div className="row">
                        <div className="col col--8 col--offset-2">
                            <BlogPostItem
                                frontMatter={frontMatter}
                                metadata={metadata}
                                isBlogPostPage
                            >
                                <BlogPostContents />
                            </BlogPostItem>
                            {(metadata.nextItem || metadata.prevItem) && (
                                <div className="margin-vert--xl">
                                    <BlogPostPaginator
                                        nextItem={metadata.nextItem}
                                        prevItem={metadata.prevItem}
                                    />
                                </div>
                            )}
                            <Helmet>
                                <script
                                    data-isso="https://isso.arash-hatami.ir"
                                    data-isso-lang="fa"
                                    data-isso-require-author="true"
                                    data-isso-require-email="true"
                                    data-isso-reply-to-self="false"
                                    data-isso-avatar="false"
                                    data-isso-gravatar="true"
                                    data-isso-vote="false"
                                    data-isso-feed="false"
                                    src="https://isso.arash-hatami.ir/js/embed.min.js"
                                ></script>
                            </Helmet>
                            <hr />
                            <section id="isso-thread"></section>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default BlogPostPage;
