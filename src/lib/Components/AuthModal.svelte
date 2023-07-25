<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { auth} from '$lib/Stores/auth';
	import Close from '$lib/assets/Close.svelte';
	// import { clickOutside } from '$lib/utils/clickOutside';
  let username="";
  let password="";
  let confirmPassword="";
  let email="";
</script>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

        <form on:submit={async (event)=>{
          if($auth.type==="log in"){
            const res=await fetch("/api/login",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                username,
                password
              })
            });
            if(res.status>=400 && res.status<=600){
              alert((await res.json())["message"]);
              return;
            }
            const data=await res.json();
            // localStorage.setItem("x-auth-token",data["x-auth-token"]);
            // $token=data["x-auth-token"];
            $auth.open=false;
            $auth.isLoggedIn=true;
            
          }else if($auth.type==="register"){
            if(password!==confirmPassword){
              alert("Password and Confirm Password are not same");
              return;
            }
            const res=await fetch("/api/register",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                username,
                password,
                email
              })
            });
            if(res.status>=400 && res.status<=600){
              alert((await res.json())["message"]);
              return;
            }
            const data=await res.json();
            // cook
            // localStorage.setItem("x-auth-token",data["x-auth-token"]);
            // $token=data["x-auth-token"];
            $auth.open=false;
            $auth.isLoggedIn=true;
          }
          invalidateAll();
        }}
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-4 sm:pb-4">
            <div class="text-center text-3xl font-semibold text-emerald-500">
              {#if $auth.type === 'log in'}
                Account Login
              {:else if $auth.type === 'register'}
                Create Your Account
              {/if}

              <button class="text-3xl float-right align-middle text-center items-center text-red-500" on:click={()=>$auth.open=false}><Close className="h-6 align-middle"/></button>
            </div>
            <br />
            <div class="space-y-4">
              <div class="relative">
                <input required  type="text" id="user_name" class=" peer" placeholder=" " bind:value={username} />
                <label for="user_name" class="">
                  {#if $auth.type==="register"}
                    Username
                  {:else if $auth.type==="log in"}
                    Email or Username
                  {/if}
                </label>
              </div>
              {#if $auth.type==="register"}
                <div class="relative">
                  <input required type="email" id="email" class=" peer" placeholder=" " bind:value={email}/>
                  <label for="email" class="">Email</label>
                </div>
              {/if}
              <div class="relative">
                <input required type="password" id="password" class=" peer" placeholder=" "  bind:value={password}/>
                <label for="password" class="">Password</label>
              </div>
              {#if $auth.type==="register"}
              <div class="relative">
                <input required type="password" id="confirm_password" class=" peer" placeholder=" "  bind:value={confirmPassword}/>
                <label for="confirm_password" class="">Confirm Password</label>
              </div>
              {/if}
              <button type="submit" class="text-center w-full bg-emerald-500 rounded px-2 py-1 text-white font-semibold">
                {#if $auth.type==="log in"}
                  Login
                {:else if $auth.type==="register"}
                  Register
                {/if}
              </button>
              {#if $auth.type==="log in"}
                <div>
                  Doesn't Have a Accout <button on:click={()=>$auth.type='register'} class="text-blue-500">Register</button>
                </div>
              {:else if $auth.type==="register"}
                Already a user <button on:click={()=>$auth.type='log in'} class="text-blue-500">Login</button>
              {/if}
            </div>
          </div>
        </form>
		</div>
	</div>
</div>

<style>
	label {
		@apply absolute text-sm text-gray-500 bg-white duration-300 
      transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 left-1 peer-focus:px-2 peer-focus:text-emerald-600 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                peer-placeholder-shown:top-1/2 peer-focus:top-2 
                peer-focus:scale-75 peer-focus:-translate-y-4;
	}
	input {
		@apply block px-2.5 pb-2.5 pt-4 w-full text-sm 
    text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 
    appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600;
	}
</style>
