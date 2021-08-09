import React from 'react';

export default function Header() {
  return (
    <center>
      <div class="card lg:card-side">
        <div class="card-body">
          <h2 class="card-title">Explore Debates</h2>
          <p>
            <div class="badge badge-outline m-2">Politics</div>
            <div class="badge badge-outline m-2">Philosophy</div>
            <div class="badge badge-outline m-2">Science</div>
            <div class="badge badge-outline m-2">Ethics</div>
            <div class="badge badge-outline m-2">Religion</div>
            <div class="badge badge-outline m-2">Technology</div>
            <br />
            <div class="badge badge-outline m-2">Health</div>
            <div class="badge badge-outline m-2">Culture</div>
            <a href="#">See more...</a>
          </p>
        </div>
      </div>
      <div class="divider"></div>
    </center>
  );
}
