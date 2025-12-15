<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crée l\'administrateur du site internet, le propriétaire du portfolio';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        User::create([
            "email" => "florian.graziani@sfr.fr",
            "name" => "Florian Graziani",
            "password" => bcrypt("Mylene.10"),
        ]);
    }
}
