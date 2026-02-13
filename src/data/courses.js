export const courses = [
    {
        id: 'os',
        title: 'Operating System: Under the Hood',
        description: 'From "What is a computer?" to "How to write a CPU scheduler."',
        level: 'Mastery',
        modules: [
            {
                id: 'os-phase1',
                title: 'Phase 1: The Foundation (6th-8th Std Level)',
                topics: [
                    {
                        id: 'os-1-1',
                        title: 'Module 1: The Boss (Intro to OS)',
                        completed: false,
                        content: `
### The Boss: Introduction to Operating Systems

**What is an OS?**
The Middleman between the User (You) and the Hardware (Circuits). Without it, you'd be wiring circuits to add numbers.

**History of OS:**
*   **Punch Cards**: Physical paper cards.
*   **Batch Processing**: Stacking jobs together.
*   **Time Sharing**: Sharing the massive mainframe.
*   **Personal Computing**: The power in your lap.

**The Kernel vs. The Shell:**
> **Analogy**: The **Kernel** is the engine (does the actual work); the **Shell** is the steering wheel (the part you touch to control it).

**System Calls:**
How programs ask the Kernel for help.
*   Example: \`printf("Hello")\` asks the screen driver to show text.
*   **Key Calls**: \`fork()\`, \`exec()\`, \`read()\`, \`write()\`.

**User Mode vs. Kernel Mode:**
Why we stop users from touching the core hardware (Protection Rings). You don't want a buggy game crashing the entire power supply driver.
                        `
                    },
                    {
                        id: 'os-1-2',
                        title: 'Module 2: The Workspace (Architecture)',
                        completed: false,
                        content: `
### The Workspace: Computer Architecture Basics

**The Cast of Characters:**

1.  **The CPU (The Chef)**: It executes instructions. The brain.
2.  **RAM (The Countertop)**: Fast, temporary storage. Needs power to remember.
3.  **Hard Disk (The Pantry)**: Slow, permanent storage. Stores your stuff forever.

**The Boot Process:**
What happens when you press the power button?
1.  **BIOS**: Wakes up hardware.
2.  **Bootloader**: Finds the OS.
3.  **Kernel**: Loads the core.
4.  **Init**: Starts user space.
                        `
                    }
                ]
            },
            {
                id: 'os-phase2',
                title: 'Phase 2: The Logic (9th-10th Std Level)',
                topics: [
                    {
                        id: 'os-2-1',
                        title: 'Module 3: Process Management',
                        completed: false,
                        content: `
### Process Management: The Scheduler

**What is a Process?**
A program in **execution**.
*   **Analogy**: A recipe book on the shelf is a **Program**. The Chef cooking that recipe is a **Process**.

**Process Control Block (PCB):**
The ID card of a process.
*   **PID**: Process ID.
*   **State**: What is it doing?
*   **Priority**: How important is it?

**Process States:**
New -> Ready -> Running -> Waiting -> Terminated.

**Threads:**
"Lightweight" processes.
*   Ex: One Chrome tab is a process; the spell-checker running inside it is a thread.

**CPU Scheduling Algorithms:**

1.  **FCFS (First-Come, First-Served)**: Like a grocery line. Simple, but slow if the first person has a full cart.
2.  **SJF (Shortest Job First)**: The quickest tasks go first. Optimal, but requires predicting the future.
3.  **Round Robin**: Everyone gets 2 seconds (Time Quantum). Fair, but switching takes time.

> **Formula**: \`WaitTime = StartTime - ArrivalTime\`

---
#### 🧠 Hints & Scaffolding
**Student Question**: "Why is Round Robin better than FCFS for interactive systems?"

*   **Hint 1 (The Scenario)**: Imagine you are typing in Word (Process A) while a Movie renders (Process B). Process B takes 1 hour. Process A takes 0.1 seconds (each key press).
*   **Hint 2 (The Visual)**: In FCFS, if the Movie starts first, when will your letter appear on the screen? (Answer: In 1 hour).
*   **Hint 3 (The Conclusion)**: Round Robin forces the Movie to pause every few milliseconds to let the Keyboard Process run. This makes the system feel "Responsive."

---
#### 📂 Level 1: The Kitchen Analogy
**The Recipe Book**: This is a Program (like Chrome or Minecraft). It sits on the shelf (Hard Drive) and does nothing. It is "static" (dead).

**The Cooking**: When you open Minecraft, the Chef takes the recipe off the shelf and starts cooking. This is a Process. It is "dynamic" (alive).

---
#### 🧮 The Math (Required for Exams)
**Problem**:
| Process | Arrival Time | Burst Time |
| :--- | :--- | :--- |
| P1 | 0ms | 8ms |
| P2 | 1ms | 4ms |
| P3 | 2ms | 9ms |

**If we use FCFS:**
1.  P1 runs 0-8ms. (Wait: 0)
2.  P2 runs 8-12ms. (Wait: 8-1 = 7ms)
3.  P3 runs 12-21ms. (Wait: 12-2 = 10ms)

**Average Wait Time**: (0 + 7 + 10) / 3 = **5.66ms**.
                        `
                    },
                    {
                        id: 'os-2-2',
                        title: 'Module 4: Memory Management',
                        completed: false,
                        content: `
### Memory Management: The Magic Trick

**The Illusion:**
How the OS gives every program the "idea" that it has infinite memory.

**Key Concepts:**
*   **Paging**: Breaking memory into small, fixed-size blocks (Pages and Frames).
*   **Virtual Memory**: Using the Hard Disk as "fake RAM" when real RAM is full.
*   **Segmentation**: Dividing memory by logic (Code, Data, Stack, Heap).

---
#### 🎤 Interview Questions (Top Tier)
**Q: What happens if you remove the 'Page Table' from an OS?**
> **A**: The CPU cannot translate Virtual Addresses to Physical Addresses; the system crashes immediately.
                        `
                    }
                ]
            },
            {
                id: 'os-phase3',
                title: 'Phase 3: The Advanced Core (Job Ready)',
                topics: [
                    {
                        id: 'os-3-1',
                        title: 'Module 5: Concurrency & Synchronization',
                        completed: false,
                        content: `
### Concurrency: The Hardest Part

**Scenario:**
Two programs try to write to the same file at the exact same time. Who wins? This is a **Race Condition**.

**The Tools:**
1.  **Locks & Mutexes**: "Locking the door" so only one process enters at a time.
2.  **Semaphores**: The traffic light of the OS.
    *   **Mutex**: Key to a toilet (only 1 person).
    *   **Semaphore**: Basket of keys (N people allowed).

**The Deadlock:**
The "Standoff".
*   **The 4 Conditions**: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.
*   **The Banker's Algorithm**: Math to avoid deadlocks.

---
#### 🧠 Hints & Scaffolding
**Problem**: "Design a system where 5 Philosophers sit around a table with 5 forks. They need 2 forks to eat. How do you prevent them from starving?" (Dining Philosophers Problem).

*   **Hint 1**: "Imagine if everyone picks up their left fork at the exact same time. What happens? No one has a right fork."
*   **Hint 2**: "To break a deadlock, you must break one of the 4 conditions. Try breaking 'Circular Wait'."
*   **Hint 3 (Solution)**: "Make the odd-numbered philosophers pick up the Left fork first, and even-numbered philosophers pick up the Right fork first."
                        `
                    },
                    {
                        id: 'os-3-2',
                        title: 'Module 6: Storage Management',
                        completed: false,
                        content: `
### Storage Management: The Librarian

**File Systems:**
*   **FAT32 vs NTFS vs EXT4**: Speed and file size limits.
*   **Directory Structure**: Trees, Acyclic Graphs.

**Disk Scheduling:**
Optimizing how the disk arm moves.
*   **SCAN (Elevator Algorithm)**: The arm moves like an elevator, servicing requests in one direction.
                        `
                    },
                    {
                        id: 'os-3-3',
                        title: 'Module 7: I/O & Security',
                        completed: false,
                        content: `
### I/O Systems & Security

**I/O:**
*   **DMA (Direct Memory Access)**: Letting devices talk to RAM without bothering the CPU.
*   **Drivers**: The translators for hardware.

**Security:**
*   **Buffer Overflow**: Writing more data than a buffer can hold to overwrite adjacent memory.
*   **Cryptography**: Basics of keeping data safe.

---
#### ☣️ The "Excessive" Section (Deep Dive Vault)
**1. The Fork Bomb**
What happens if a process creates a copy of itself (fork), and the copy creates a copy, infinitely?
\`\`\`bash
:(){ :|:& };:
\`\`\`
**Result**: The "Process Table" fills up instantly. System freezes.

**2. Zombie & Orphan Processes**
*   **Zombie**: Process died but parent hasn't collected exit status.
*   **Orphan**: Parent died while child was running. Adopted by \`init\`.
                        `
                    }
                ]
            }
        ]
    },
    { id: 'net', title: 'Networking', description: 'Understand how the internet works.', level: 'All Levels', modules: [] },
    { id: 'dbms', title: 'DBMS', description: 'Database Management Systems core concepts.', level: 'All Levels', modules: [] },
    { id: 'mysql', title: 'MySQL', description: 'Master SQL queries and database design.', level: 'All Levels', modules: [] },
    { id: 'sys-design', title: 'System Design', description: 'Scalable architecture and design patterns.', level: 'All Levels', modules: [] },
    { id: 'mern', title: 'MERN Stack', description: 'MongoDB, Express, React, Node.js mastery.', level: 'All Levels', modules: [] },
    { id: 'backend', title: 'Backend Development', description: 'Server-side logic, auth, and more.', level: 'All Levels', modules: [] },
    { id: 'api', title: 'API & Deployment', description: 'REST, GraphQL, and Cloud Deployment.', level: 'All Levels', modules: [] },
    { id: 'java-100', title: 'Java 100 Sums', description: '30 Easy, 50 Medium, 20 Hard problems.', level: 'Practice', modules: [] },
    { id: 'tools', title: 'Modern Tools', description: 'Git, Vercel, Firebase, Docker.', level: 'Practical', modules: [] },
    { id: 'dsa', title: 'DSA', description: 'Data Structures and Algorithms from scratch.', level: 'Hard', modules: [] },
    { id: 'oops', title: 'OOPs in Java', description: 'Object-Oriented Programming methodologies.', level: 'Intermediate', modules: [] }
];
